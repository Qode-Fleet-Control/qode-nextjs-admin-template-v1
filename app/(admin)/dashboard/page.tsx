import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { ActivityTable } from "@/components/dashboard/ActivityTable";
import { StatCards } from "@/components/dashboard/StatCards";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your workspace activity and key metrics.
        </p>
      </div>
      <StatCards />
      <ActivityChart />
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">Recent activity</h3>
        <ActivityTable />
      </div>
    </section>
  );
}
