"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";

type ActivityStatus = "success" | "pending" | "failed";

interface ActivityRow {
  id: string;
  user: string;
  action: string;
  date: string;
  status: ActivityStatus;
}

const STATUS_VARIANT: Record<
  ActivityStatus,
  "default" | "secondary" | "destructive"
> = {
  success: "default",
  pending: "secondary",
  failed: "destructive",
};

// Ten hardcoded rows of recent activity. Replace with a real feed once the
// backend exposes an activity endpoint.
const ACTIVITY_ROWS: ActivityRow[] = [
  { id: "act_01", user: "Ava Thompson", action: "Signed in", date: "2026-07-31", status: "success" },
  { id: "act_02", user: "Liam Carter", action: "Updated profile", date: "2026-07-30", status: "success" },
  { id: "act_03", user: "Sophia Nguyen", action: "Invited a teammate", date: "2026-07-30", status: "pending" },
  { id: "act_04", user: "Noah Patel", action: "Exported a report", date: "2026-07-29", status: "success" },
  { id: "act_05", user: "Isabella Rossi", action: "Deleted a project", date: "2026-07-28", status: "failed" },
  { id: "act_06", user: "Ethan Kim", action: "Changed password", date: "2026-07-28", status: "success" },
  { id: "act_07", user: "Mia Johansson", action: "Upgraded plan", date: "2026-07-27", status: "pending" },
  { id: "act_08", user: "Lucas Silva", action: "Created an API key", date: "2026-07-26", status: "success" },
  { id: "act_09", user: "Amelia Clarke", action: "Revoked access", date: "2026-07-25", status: "failed" },
  { id: "act_10", user: "Mason Reyes", action: "Signed out", date: "2026-07-24", status: "success" },
];

const columns: ColumnDef<ActivityRow>[] = [
  {
    accessorKey: "user",
    header: "User",
    enableSorting: false,
  },
  {
    accessorKey: "action",
    header: "Action",
    enableSorting: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    enableSorting: true,
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={STATUS_VARIANT[status]} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
];

export function ActivityTable() {
  return (
    <DataTable
      columns={columns}
      data={ACTIVITY_ROWS}
      searchPlaceholder="Search activity..."
    />
  );
}
