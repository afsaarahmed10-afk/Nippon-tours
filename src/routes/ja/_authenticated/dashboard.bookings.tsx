import { createFileRoute } from "@tanstack/react-router";
import { BookingsPage } from "../../_authenticated/dashboard.bookings";

export const Route = createFileRoute("/ja/_authenticated/dashboard/bookings")({
  component: () => <BookingsPage locale="ja" />,
});
