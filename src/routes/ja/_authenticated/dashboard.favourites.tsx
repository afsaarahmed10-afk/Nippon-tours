import { createFileRoute } from "@tanstack/react-router";
import { SavedList } from "../../_authenticated/dashboard.saved-tours";

export const Route = createFileRoute("/ja/_authenticated/dashboard/favourites")({
  component: () => <SavedList favouritesOnly={true} />,
});
