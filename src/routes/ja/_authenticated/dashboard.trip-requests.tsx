import { createFileRoute } from "@tanstack/react-router";
import { TripRequestsPage } from "../../_authenticated/dashboard.trip-requests";

export const Route = createFileRoute("/ja/_authenticated/dashboard/trip-requests")({
  component: TripRequestsPage,
});
