import { DataTable, Column } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Admin {
  id: string;
  name: string;
  email: string;
  permissions: string[];
  lastLogin: string;
  status: 'active' | 'suspended';
}

const dummyAdmins: Admin[] = Array.from({ length: 12 }, (_, i) => ({
  id: `ADMIN-${100 + i}`,
  name: `Admin ${i + 1}`,
  email: `admin${i + 1}@example.com`,
  permissions: ['read', 'write', 'delete'].filter(() => Math.random() > 0.3),
  lastLogin: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
  status: Math.random() > 0.1 ? 'active' : 'suspended',
}));

const columns: Column<Admin>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'permissions',
    header: 'Permissions',
    cell: (item) => (
      <div className="flex gap-1 flex-wrap">
        {item.permissions.map((perm) => (
          <Badge key={perm} variant="secondary" className="text-xs">
            {perm}
          </Badge>
        ))}
      </div>
    ),
  },
  { key: 'lastLogin', header: 'Last Login' },
  {
    key: 'status',
    header: 'Status',
    cell: (item) => (
      <Badge variant={item.status === 'active' ? 'default' : 'destructive'}>
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
          Edit
        </Button>
        <Button variant="ghost" size="sm">
          Manage
        </Button>
      </div>
    ),
  },
];

export function AdminTableAdmins() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administrators</h1>
          <p className="text-muted-foreground mt-2">
            Manage system administrators and their access
          </p>
        </div>
        <Button>Add Admin</Button>
      </div>

      <DataTable data={dummyAdmins} columns={columns} searchKey="name" />
    </div>
  );
}
