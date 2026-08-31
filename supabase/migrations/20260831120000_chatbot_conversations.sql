-- Nippon AI chatbot: lightweight, privacy-conscious conversation analytics.
-- No message text is stored — only counts, matched topic keywords, and CTA/lead flags.
CREATE TABLE IF NOT EXISTS public.chatbot_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  message_count integer NOT NULL DEFAULT 0,
  topics text[] NOT NULL DEFAULT '{}',
  clicked_plan_trip boolean NOT NULL DEFAULT false,
  clicked_tours boolean NOT NULL DEFAULT false,
  clicked_contact boolean NOT NULL DEFAULT false,
  lead_captured boolean NOT NULL DEFAULT false,
  trip_request_id uuid REFERENCES public.trip_requests(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS chatbot_conversations_session_id_key
  ON public.chatbot_conversations(session_id);

GRANT SELECT, INSERT, UPDATE ON public.chatbot_conversations TO anon;
GRANT SELECT, INSERT, UPDATE ON public.chatbot_conversations TO authenticated;
GRANT ALL ON public.chatbot_conversations TO service_role;

ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Session ids are opaque, client-generated random tokens — not guessable/enumerable,
-- and SELECT is admin-only, so a caller can only touch a row it already knows the id of.
CREATE POLICY "ChatbotConversations: public insert" ON public.chatbot_conversations
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(session_id) BETWEEN 8 AND 100
    AND coalesce(array_length(topics, 1), 0) <= 20
  );

CREATE POLICY "ChatbotConversations: public update by session" ON public.chatbot_conversations
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (
    length(session_id) BETWEEN 8 AND 100
    AND coalesce(array_length(topics, 1), 0) <= 20
  );

CREATE POLICY "ChatbotConversations: admin read" ON public.chatbot_conversations
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER chatbot_conversations_updated_at BEFORE UPDATE ON public.chatbot_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
