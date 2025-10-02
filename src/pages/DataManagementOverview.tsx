import { DataTable, Column } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DataItem {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  value: number;
  lastUpdated: string;
}

const dummyData: DataItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `DATA-${1000 + i}`,
  name: `Data Item ${i + 1}`,
  status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as any,
  value: Math.floor(Math.random() * 10000),
  lastUpdated: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toLocaleDateString(),
}));

const columns: Column<DataItem>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  {
    key: 'status',
    header: 'Status',
    cell: (item) => (
      <Badge
        variant={
          item.status === 'active'
            ? 'default'
            : item.status === 'inactive'
            ? 'secondary'
            : 'outline'
        }
      >
        {item.status}
      </Badge>
    ),
  },
  {
    key: 'value',
    header: 'Value',
    cell: (item) => `$${item.value.toLocaleString()}`,
  },
  { key: 'lastUpdated', header: 'Last Updated' },
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

export function DataManagementOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Overview</h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor all your data entries
          </p>
        </div>
        <Button>Add New</Button>
      </div>

      <DataTable data={dummyData} columns={columns} searchKey="name" />
    </div>
  );
}
