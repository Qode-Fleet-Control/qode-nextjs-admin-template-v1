"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DeviceSlice {
  device: string;
  share: number;
  color: string;
}

// Hardcoded device split (percent).
const DEVICE_DATA: DeviceSlice[] = [
  { device: "Desktop", share: 58, color: "var(--chart-1)" },
  { device: "Mobile", share: 31, color: "var(--chart-3)" },
  { device: "Tablet", share: 11, color: "var(--chart-5)" },
];

export function DevicePieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device split</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DEVICE_DATA}
                dataKey="share"
                nameKey="device"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                strokeWidth={2}
                stroke="var(--background)"
              >
                {DEVICE_DATA.map((slice) => (
                  <Cell key={slice.device} fill={slice.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--popover-foreground)",
                  fontSize: 12,
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value: string) => (
                  <span style={{ color: "var(--muted-foreground)", fontSize: 12 }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
