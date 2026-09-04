import { createFileRoute } from "@tanstack/react-router";
import { MessagesPage } from "../../_authenticated/dashboard.messages";

export const Route = createFileRoute("/ja/_authenticated/dashboard/messages")({
  component: MessagesPage,
});
