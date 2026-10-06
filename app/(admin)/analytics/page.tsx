import { ChannelBarChart } from "@/components/analytics/ChannelBarChart";
import { ConversionAreaChart } from "@/components/analytics/ConversionAreaChart";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";
import { DevicePieChart } from "@/components/analytics/DevicePieChart";
import { MetricCards } from "@/components/analytics/MetricCards";

export default function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Track usage trends and performance over time.
          </p>
        </div>
        <DateRangePicker />
      </div>
      <MetricCards />
      <ChannelBarChart />
      <div className="grid gap-4 lg:grid-cols-2">
        <DevicePieChart />
        <ConversionAreaChart />
      </div>
    </section>
  );
}
