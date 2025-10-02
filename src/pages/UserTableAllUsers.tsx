import { DataTable, Column } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  joinedDate: string;
  status: 'active' | 'inactive';
}

const dummyUsers: User[] = Array.from({ length: 30 }, (_, i) => ({
  id: `USER-${1000 + i}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['admin', 'user', 'moderator'][Math.floor(Math.random() * 3)] as any,
  joinedDate: new Date(
    Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  status: Math.random() > 0.3 ? 'active' : 'inactive',
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
  { key: 'joinedDate', header: 'Joined Date' },
  {
    key: 'status',
    header: 'Status',
    cell: (item) => (
      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
        {item.status}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: () => (
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          View
        </Button>
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
];

export function UserTableAllUsers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all registered users
          </p>
        </div>
        <Button>Add User</Button>
      </div>

      <DataTable data={dummyUsers} columns={columns} searchKey="name" />
    </div>
  );
}
