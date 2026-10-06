import { ArrowDown, ArrowUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

const STATS: Stat[] = [
  { label: "Total Users", value: "12,483", delta: "12.5%", trend: "up" },
  { label: "Revenue", value: "$48,271", delta: "8.2%", trend: "up" },
  { label: "Active Sessions", value: "1,429", delta: "3.1%", trend: "down" },
  { label: "Conversion Rate", value: "3.24%", delta: "0.8%", trend: "up" },
];

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => {
        const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;
        return (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600",
                )}
              >
                <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{stat.delta}</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
