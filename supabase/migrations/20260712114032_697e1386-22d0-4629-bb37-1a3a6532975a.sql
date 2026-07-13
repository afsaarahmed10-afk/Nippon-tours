
-- ============================================================
-- ROLES & PROFILES
-- ============================================================
create type public.app_role as enum ('admin', 'editor');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "Profiles: view own" on public.profiles for select to authenticated using (auth.uid() = id);
create policy "Profiles: update own" on public.profiles for update to authenticated using (auth.uid() = id);
create policy "Profiles: insert own" on public.profiles for insert to authenticated with check (auth.uid() = id);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Roles: view own" on public.user_roles for select to authenticated using (auth.uid() = user_id);
create policy "Roles: admin manage" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Auto-create profile on signup; grant admin role to the FIRST signup.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  user_count int;
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));

  select count(*) into user_count from auth.users;
  if user_count <= 1 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
      on conflict (user_id, role) do nothing;
  end if;
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Shared updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ============================================================
-- DESTINATIONS
-- ============================================================
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  region text,
  tagline text,
  summary text,
  description text,
  hero_image text,
  gallery jsonb not null default '[]'::jsonb,
  best_season text,
  weather text,
  nearby_attractions jsonb not null default '[]'::jsonb,
  map_lat numeric,
  map_lng numeric,
  seo_title text,
  seo_description text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.destinations to anon;
grant select, insert, update, delete on public.destinations to authenticated;
grant all on public.destinations to service_role;
alter table public.destinations enable row level security;
create policy "Destinations: public read published" on public.destinations for select to anon using (published = true);
create policy "Destinations: auth read all" on public.destinations for select to authenticated using (true);
create policy "Destinations: admin write" on public.destinations for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger destinations_updated_at before update on public.destinations for each row execute function public.set_updated_at();

-- ============================================================
-- TOURS
-- ============================================================
create table public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  destination_id uuid references public.destinations(id) on delete set null,
  days int not null default 1,
  price numeric not null default 0,
  group_size text,
  rating numeric not null default 5,
  reviews_count int not null default 0,
  summary text,
  description text,
  image text,
  gallery jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  itinerary jsonb not null default '[]'::jsonb,
  includes jsonb not null default '[]'::jsonb,
  excludes jsonb not null default '[]'::jsonb,
  meeting_point text,
  availability text,
  best_season text,
  max_guests int,
  tags jsonb not null default '[]'::jsonb,
  seo_title text,
  seo_description text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.tours to anon;
grant select, insert, update, delete on public.tours to authenticated;
grant all on public.tours to service_role;
alter table public.tours enable row level security;
create policy "Tours: public read published" on public.tours for select to anon using (published = true);
create policy "Tours: auth read all" on public.tours for select to authenticated using (true);
create policy "Tours: admin write" on public.tours for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger tours_updated_at before update on public.tours for each row execute function public.set_updated_at();

-- ============================================================
-- FAQS
-- ============================================================
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.faqs to anon;
grant select, insert, update, delete on public.faqs to authenticated;
grant all on public.faqs to service_role;
alter table public.faqs enable row level security;
create policy "Faqs: public read published" on public.faqs for select to anon using (published = true);
create policy "Faqs: auth read all" on public.faqs for select to authenticated using (true);
create policy "Faqs: admin write" on public.faqs for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger faqs_updated_at before update on public.faqs for each row execute function public.set_updated_at();

-- ============================================================
-- TESTIMONIALS (curated) & REVIEWS (user-submitted, moderated)
-- ============================================================
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  source text,
  rating int not null default 5,
  quote text not null,
  tour text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant all on public.testimonials to service_role;
alter table public.testimonials enable row level security;
create policy "Testimonials: public read published" on public.testimonials for select to anon using (published = true);
create policy "Testimonials: auth read all" on public.testimonials for select to authenticated using (true);
create policy "Testimonials: admin write" on public.testimonials for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();

create type public.review_status as enum ('pending', 'approved', 'rejected');
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  country text,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  tour_id uuid references public.tours(id) on delete set null,
  status public.review_status not null default 'pending',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert on public.reviews to anon;
grant select, insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "Reviews: public read approved" on public.reviews for select to anon using (status = 'approved');
create policy "Reviews: public submit" on public.reviews for insert to anon with check (status = 'pending');
create policy "Reviews: auth read all" on public.reviews for select to authenticated using (true);
create policy "Reviews: admin write" on public.reviews for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger reviews_updated_at before update on public.reviews for each row execute function public.set_updated_at();

-- ============================================================
-- BLOG POSTS
-- ============================================================
create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  cover_image text,
  body text not null default '',
  category text,
  tags jsonb not null default '[]'::jsonb,
  author text,
  seo_title text,
  seo_description text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
grant all on public.blog_posts to service_role;
alter table public.blog_posts enable row level security;
create policy "Blog: public read published" on public.blog_posts for select to anon using (published = true);
create policy "Blog: auth read all" on public.blog_posts for select to authenticated using (true);
create policy "Blog: admin write" on public.blog_posts for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger blog_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

-- ============================================================
-- VEHICLES (Car Rental catalogue)
-- ============================================================
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vehicle_type text not null,
  seats int not null default 4,
  luggage int not null default 2,
  price_per_day numeric not null default 0,
  image text,
  gallery jsonb not null default '[]'::jsonb,
  description text,
  transmission text default 'Automatic',
  fuel_type text default 'Petrol',
  driver_included boolean not null default false,
  self_drive boolean not null default true,
  airport_pickup boolean not null default true,
  airport_dropoff boolean not null default true,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.vehicles to anon;
grant select, insert, update, delete on public.vehicles to authenticated;
grant all on public.vehicles to service_role;
alter table public.vehicles enable row level security;
create policy "Vehicles: public read published" on public.vehicles for select to anon using (published = true);
create policy "Vehicles: auth read all" on public.vehicles for select to authenticated using (true);
create policy "Vehicles: admin write" on public.vehicles for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger vehicles_updated_at before update on public.vehicles for each row execute function public.set_updated_at();

-- ============================================================
-- TRIP REQUESTS & CAR RENTAL REQUESTS
-- ============================================================
create type public.request_status as enum ('unread', 'contacted', 'confirmed', 'closed');

create table public.trip_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  country text,
  travel_start date,
  travel_end date,
  group_size int,
  budget text,
  interests jsonb not null default '[]'::jsonb,
  destinations jsonb not null default '[]'::jsonb,
  tours jsonb not null default '[]'::jsonb,
  message text,
  needs_car_rental boolean not null default false,
  status public.request_status not null default 'unread',
  source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant insert on public.trip_requests to anon;
grant select, insert, update, delete on public.trip_requests to authenticated;
grant all on public.trip_requests to service_role;
alter table public.trip_requests enable row level security;
create policy "TripRequests: public submit" on public.trip_requests for insert to anon with check (true);
create policy "TripRequests: admin read" on public.trip_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "TripRequests: admin write" on public.trip_requests for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger trip_requests_updated_at before update on public.trip_requests for each row execute function public.set_updated_at();

create table public.car_rental_requests (
  id uuid primary key default gen_random_uuid(),
  trip_request_id uuid references public.trip_requests(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete set null,
  full_name text,
  email text,
  phone text,
  pickup_location text not null,
  dropoff_location text not null,
  pickup_date date not null,
  pickup_time text,
  return_date date not null,
  return_time text,
  passengers int not null default 1,
  luggage int not null default 0,
  vehicle_preference text,
  service_type text,
  special_requirements text,
  status public.request_status not null default 'unread',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant insert on public.car_rental_requests to anon;
grant select, insert, update, delete on public.car_rental_requests to authenticated;
grant all on public.car_rental_requests to service_role;
alter table public.car_rental_requests enable row level security;
create policy "CarRental: public submit" on public.car_rental_requests for insert to anon with check (true);
create policy "CarRental: admin read" on public.car_rental_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "CarRental: admin write" on public.car_rental_requests for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger car_rental_updated_at before update on public.car_rental_requests for each row execute function public.set_updated_at();

-- ============================================================
-- NEWSLETTER
-- ============================================================
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);
grant insert on public.newsletter_subscribers to anon;
grant select, insert, update, delete on public.newsletter_subscribers to authenticated;
grant all on public.newsletter_subscribers to service_role;
alter table public.newsletter_subscribers enable row level security;
create policy "Newsletter: public subscribe" on public.newsletter_subscribers for insert to anon with check (true);
create policy "Newsletter: admin read" on public.newsletter_subscribers for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Newsletter: admin manage" on public.newsletter_subscribers for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Helpful indexes
create index tours_featured_idx on public.tours (featured) where published = true;
create index tours_category_idx on public.tours (category) where published = true;
create index destinations_featured_idx on public.destinations (featured) where published = true;
create index blog_published_idx on public.blog_posts (published_at desc) where published = true;
create index trip_requests_status_idx on public.trip_requests (status, created_at desc);
create index car_rental_status_idx on public.car_rental_requests (status, created_at desc);
