import { createFileRoute } from "@tanstack/react-router";
import { SeasonalExperiencesPage, seasonalExperiencesHead } from "../seasonal-experiences";

export const Route = createFileRoute("/ja/seasonal-experiences")({
  head: () => seasonalExperiencesHead("ja"),
  component: () => <SeasonalExperiencesPage locale="ja" />,
});
