import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/admin/AdminShell";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/vehicles")({
  component: () => (
    <AdminPage title="Car Rental Vehicles" description="Fleet shown to guests inside Plan My Trip.">
      <AdminCrud
        table="vehicles"
        singular="Vehicle"
        plural="Vehicles"
        orderBy="sort_order"
        ascending={true}
        invalidatePublic={["vehicles"]}
        columns={[
          { key: "name", label: "Name", format: (r) => <span className="font-semibold">{String(r.name)}</span> },
          { key: "vehicle_type", label: "Type" },
          { key: "seats", label: "Seats" },
          { key: "price_per_day", label: "¥/day", format: (r) => `¥${Number(r.price_per_day).toLocaleString()}` },
          { key: "published", label: "Status", format: (r) => (r.published ? "Live" : "Hidden") },
        ]}
        fields={[
          { key: "name", label: "Name", type: "text", required: true },
          {
            key: "vehicle_type",
            label: "Vehicle type",
            type: "select",
            options: ["Economy Car", "Sedan", "SUV", "Luxury Car", "Van", "Chauffeur Service"],
            required: true,
          },
          { key: "seats", label: "Seats", type: "number", required: true },
          { key: "luggage", label: "Luggage capacity", type: "number" },
          { key: "price_per_day", label: "Price per day (JPY)", type: "number", required: true },
          { key: "image", label: "Image URL", type: "url" },
          { key: "description", label: "Description", type: "textarea", rows: 3 },
          { key: "transmission", label: "Transmission", type: "select", options: ["Automatic", "Manual"] },
          { key: "fuel_type", label: "Fuel type", type: "select", options: ["Petrol", "Diesel", "Hybrid", "Electric"] },
          { key: "driver_included", label: "Driver included", type: "boolean" },
          { key: "self_drive", label: "Available self-drive", type: "boolean" },
          { key: "airport_pickup", label: "Airport pickup available", type: "boolean" },
          { key: "airport_dropoff", label: "Airport drop-off available", type: "boolean" },
          { key: "sort_order", label: "Sort order", type: "number" },
          { key: "featured", label: "Featured", type: "boolean" },
          { key: "published", label: "Published", type: "boolean" },
        ]}
        defaults={{
          vehicle_type: "Sedan",
          seats: 4,
          luggage: 2,
          transmission: "Automatic",
          fuel_type: "Petrol",
          self_drive: true,
          airport_pickup: true,
          airport_dropoff: true,
          published: true,
          sort_order: 100,
        }}
      />
    </AdminPage>
  ),
});
