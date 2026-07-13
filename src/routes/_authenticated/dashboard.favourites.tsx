import { createFileRoute } from "@tanstack/react-router";
import { SavedList } from "./dashboard.saved-tours";

export const Route = createFileRoute("/_authenticated/dashboard/favourites")({
  component: () => <SavedList favouritesOnly={true} />,
});
