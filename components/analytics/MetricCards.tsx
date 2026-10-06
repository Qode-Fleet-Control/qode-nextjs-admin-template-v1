import { ArrowDown, ArrowUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Metric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

// Hardcoded analytics summary metrics for the template preview.
const METRICS: Metric[] = [
  { label: "Page Views", value: "128,430", delta: "9.4%", trend: "up" },
  { label: "Unique Visitors", value: "94,210", delta: "6.1%", trend: "up" },
  { label: "Bounce Rate", value: "38.2%", delta: "2.3%", trend: "down" },
];

export function MetricCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {METRICS.map((metric) => {
        const TrendIcon = metric.trend === "up" ? ArrowUp : ArrowDown;
        return (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-semibold tracking-tight">
                {metric.value}
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  metric.trend === "up" ? "text-emerald-600" : "text-red-600",
                )}
              >
                <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{metric.delta}</span>
                <span className="text-muted-foreground">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
