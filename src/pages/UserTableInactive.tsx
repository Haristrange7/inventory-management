import { DataTable, Column } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  lastActive: string;
}

const dummyInactiveUsers: User[] = Array.from({ length: 15 }, (_, i) => ({
  id: `USER-${2000 + i}`,
  name: `Inactive User ${i + 1}`,
  email: `inactive${i + 1}@example.com`,
  role: ['admin', 'user', 'moderator'][Math.floor(Math.random() * 3)] as any,
  lastActive: new Date(
    Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
}));

const columns: Column<User>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Role',
    cell: (item) => (
      <Badge
        variant={
          item.role === 'admin'
            ? 'default'
            : item.role === 'moderator'
            ? 'secondary'
            : 'outline'
        }
      >
        {item.role}
      </Badge>
    ),
  },
  { key: 'lastActive', header: 'Last Active' },
  {
    key: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          Reactivate
        </Button>
        <Button variant="ghost" size="sm">
          Delete
        </Button>
      </div>
    ),
  },
];

export function UserTableInactive() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inactive Users</h1>
          <p className="text-muted-foreground mt-2">
            Users who haven't been active recently
          </p>
        </div>
      </div>

      <DataTable data={dummyInactiveUsers} columns={columns} searchKey="name" />
    </div>
  );
}
