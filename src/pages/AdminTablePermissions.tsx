import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface Permission {
  name: string;
  description: string;
  level: 'low' | 'medium' | 'high';
  assignedTo: number;
}

const permissions: Permission[] = [
  {
    name: 'User Management',
    description: 'Create, edit, and delete users',
    level: 'high',
    assignedTo: 5,
  },
  {
    name: 'Content Management',
    description: 'Manage content and posts',
    level: 'medium',
    assignedTo: 8,
  },
  {
    name: 'View Analytics',
    description: 'Access to analytics and reports',
    level: 'low',
    assignedTo: 12,
  },
  {
    name: 'System Settings',
    description: 'Configure system-wide settings',
    level: 'high',
    assignedTo: 3,
  },
  {
    name: 'API Access',
    description: 'Access to API endpoints',
    level: 'medium',
    assignedTo: 6,
  },
  {
    name: 'Billing Management',
    description: 'Manage billing and payments',
    level: 'high',
    assignedTo: 4,
  },
];

export function AdminTablePermissions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
          <p className="text-muted-foreground mt-2">
            Manage system permissions and access levels
          </p>
        </div>
        <Button>Create Permission</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {permissions.map((permission, index) => (
          <motion.div
            key={permission.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{permission.name}</CardTitle>
                  <Badge
                    variant={
                      permission.level === 'high'
                        ? 'destructive'
                        : permission.level === 'medium'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {permission.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {permission.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">
                    Assigned to {permission.assignedTo} admins
                  </span>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
