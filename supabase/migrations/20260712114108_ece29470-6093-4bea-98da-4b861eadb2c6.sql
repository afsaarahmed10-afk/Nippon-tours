
-- Trigger-only helpers: no one should call them directly
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Tighten public-insert policies with minimal validation
drop policy "Reviews: public submit" on public.reviews;
create policy "Reviews: public submit" on public.reviews for insert to anon
  with check (status = 'pending' and length(name) between 1 and 120 and length(comment) between 1 and 4000 and rating between 1 and 5);

drop policy "TripRequests: public submit" on public.trip_requests;
create policy "TripRequests: public submit" on public.trip_requests for insert to anon
  with check (length(full_name) between 1 and 200 and length(email) between 3 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');

drop policy "CarRental: public submit" on public.car_rental_requests
;
create policy "CarRental: public submit" on public.car_rental_requests for insert to anon
  with check (length(pickup_location) between 1 and 200 and length(dropoff_location) between 1 and 200 and pickup_date is not null and return_date is not null);

drop policy "Newsletter: public subscribe" on public.newsletter_subscribers;
create policy "Newsletter: public subscribe" on public.newsletter_subscribers for insert to anon
  with check (length(email) between 3 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');
