"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ConversionPoint {
  day: string;
  rate: number;
}

// Hardcoded conversion rate (percent) over the last 7 days.
const CONVERSION_DATA: ConversionPoint[] = [
  { day: "Mon", rate: 2.8 },
  { day: "Tue", rate: 3.1 },
  { day: "Wed", rate: 2.9 },
  { day: "Thu", rate: 3.6 },
  { day: "Fri", rate: 3.9 },
  { day: "Sat", rate: 3.3 },
  { day: "Sun", rate: 3.7 },
];

export function ConversionAreaChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={CONVERSION_DATA}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="conversion-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={40}
                unit="%"
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Rate"]}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--popover-foreground)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#conversion-fill)"
                activeDot={{ r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
