
-- 1) Extend request_status enum
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'processing';
ALTER TYPE public.request_status ADD VALUE IF NOT EXISTS 'completed';

-- 2) Link trip_requests to auth.users optionally
ALTER TABLE public.trip_requests
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS trip_requests_user_id_idx ON public.trip_requests(user_id);

-- Customer read-own policy
DROP POLICY IF EXISTS "TripRequests: read own" ON public.trip_requests;
CREATE POLICY "TripRequests: read own" ON public.trip_requests
  FOR SELECT TO authenticated
  USING (user_id IS NOT NULL AND auth.uid() = user_id);

-- Allow signed-in users to submit (attach their user_id)
DROP POLICY IF EXISTS "TripRequests: authenticated submit" ON public.trip_requests;
CREATE POLICY "TripRequests: authenticated submit" ON public.trip_requests
  FOR INSERT TO authenticated
  WITH CHECK (
    (user_id IS NULL OR user_id = auth.uid())
    AND length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
  );

-- 3) saved_tours
CREATE TABLE IF NOT EXISTS public.saved_tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id uuid NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  is_favourite boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, tour_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_tours TO authenticated;
GRANT ALL ON public.saved_tours TO service_role;
ALTER TABLE public.saved_tours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "SavedTours: owner read" ON public.saved_tours
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "SavedTours: owner insert" ON public.saved_tours
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "SavedTours: owner update" ON public.saved_tours
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "SavedTours: owner delete" ON public.saved_tours
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "SavedTours: admin read" ON public.saved_tours
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 4) notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON public.notifications(user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Notifications: owner read" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Notifications: owner update" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Notifications: admin manage" ON public.notifications
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 5) contact_messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  body text NOT NULL,
  status public.request_status NOT NULL DEFAULT 'unread',
  source text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contact_messages_user_id_idx ON public.contact_messages(user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT INSERT ON public.contact_messages TO anon;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ContactMessages: public submit" ON public.contact_messages
  FOR INSERT TO anon
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(body) BETWEEN 1 AND 5000
  );
CREATE POLICY "ContactMessages: authenticated submit" ON public.contact_messages
  FOR INSERT TO authenticated
  WITH CHECK (
    (user_id IS NULL OR user_id = auth.uid())
    AND length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(body) BETWEEN 1 AND 5000
  );
CREATE POLICY "ContactMessages: owner read" ON public.contact_messages
  FOR SELECT TO authenticated USING (user_id IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY "ContactMessages: admin manage" ON public.contact_messages
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER contact_messages_updated_at BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
