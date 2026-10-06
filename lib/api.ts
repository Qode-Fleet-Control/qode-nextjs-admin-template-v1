/**
 * Typed fetch helpers for the admin template.
 *
 * These wrap `fetch` against `NEXT_PUBLIC_API_URL`, but fall back to in-memory
 * mock data so the template runs with no backend attached. Swap the mock bodies
 * for real requests once an API is available.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "active" | "inactive";
  joinedAt: string;
}

const ROLES: User["role"][] = ["admin", "member", "viewer"];
const STATUSES: User["status"][] = ["active", "inactive"];

const NAMES = [
  "Ava Thompson",
  "Liam Carter",
  "Sophia Nguyen",
  "Noah Patel",
  "Isabella Rossi",
  "Ethan Kim",
  "Mia Johansson",
  "Lucas Silva",
  "Amelia Clarke",
  "Mason Reyes",
  "Harper Lewis",
  "Elijah Novak",
  "Evelyn Brooks",
  "James Okafor",
  "Charlotte Meyer",
  "Benjamin Ford",
  "Aria Petrova",
  "Henry Walsh",
  "Scarlett Diaz",
  "Sebastian Cole",
];

function slugifyEmail(name: string): string {
  return `${name.toLowerCase().replace(/[^a-z]+/g, ".")}@example.com`;
}

const MOCK_USERS: User[] = NAMES.map((name, index) => ({
  id: `usr_${String(index + 1).padStart(3, "0")}`,
  name,
  email: slugifyEmail(name),
  role: ROLES[index % ROLES.length],
  status: STATUSES[index % STATUSES.length],
  // Deterministic dates spread across 2024 so the table has sortable values.
  joinedAt: new Date(Date.UTC(2024, index % 12, ((index * 3) % 27) + 1))
    .toISOString()
    .slice(0, 10),
}));

export async function getUsers(): Promise<User[]> {
  if (BASE_URL) {
    const response = await fetch(`${BASE_URL}/users`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load users: ${response.status}`);
    }
    return (await response.json()) as User[];
  }
  return MOCK_USERS;
}

export async function createUser(data: Partial<User>): Promise<User> {
  if (BASE_URL) {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status}`);
    }
    return (await response.json()) as User;
  }
  return {
    id: `usr_${Math.floor(Date.now() / 1000)}`,
    name: data.name ?? "New User",
    email: data.email ?? "new.user@example.com",
    role: data.role ?? "member",
    status: data.status ?? "active",
    joinedAt: new Date().toISOString().slice(0, 10),
  };
}

export async function deleteUser(id: string): Promise<void> {
  if (BASE_URL) {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.status}`);
    }
    return;
  }
  // No-op mock: nothing to persist without a backend.
}
