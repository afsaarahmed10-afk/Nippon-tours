import { createFileRoute } from "@tanstack/react-router";
import { vehiclesQueryOptions } from "@/lib/queries";
import { PlannerPage, planMyTripHead } from "../plan-my-trip";

export const Route = createFileRoute("/ja/plan-my-trip")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(vehiclesQueryOptions());
  },
  head: () => planMyTripHead("ja"),
  component: () => <PlannerPage locale="ja" />,
});
