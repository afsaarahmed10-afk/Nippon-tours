import { createFileRoute } from "@tanstack/react-router";
import { GroupToursPage, groupToursHead } from "../group-tours";

export const Route = createFileRoute("/ja/group-tours")({
  head: () => groupToursHead("ja"),
  component: () => <GroupToursPage locale="ja" />,
});
