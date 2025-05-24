import { Phone, Check, X, RefreshCw, Laptop, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface Session {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

const deviceIcons = {
  desktop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
};

export const ActiveSessions = ({
  sessions = [],
  onRevoke = (id: string) => {
    console.log('Revoke session:', id);
    // In a real app, this would call an API to revoke the session
  },
  onRefresh = () => {
    console.log('Refreshing sessions...');
    // In a real app, this would fetch fresh session data
  },
}: {
  sessions?: Session[];
  onRevoke?: (id: string) => void;
  onRefresh?: () => void;
}) => {
  const DeviceIcon = ({ type }: { type: 'desktop' | 'mobile' | 'tablet' }) => {
    const Icon = deviceIcons[type] || Phone;
    return <Icon className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className="shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle>Active Sessions</CardTitle>
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-2 sm:p-2">
        {sessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No active sessions found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => {
                const DeviceIcon = deviceIcons[session.deviceType] || Phone;
                return (
                  <TableRow key={session.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <DeviceIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p>{session.device}</p>
                          <p className="text-xs text-muted-foreground">{session.os}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{session.browser}</TableCell>
                    <TableCell>
                      <div>
                        <p>{session.ip}</p>
                        <p className="text-xs text-muted-foreground">{session.location}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(session.lastActive, { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      {session.current ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <Check className="h-3 w-3 mr-1" /> Current
                        </Badge>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/90 h-8 px-2"
                          onClick={() => onRevoke(session.id)}
                        >
                          <X className="h-4 w-4 mr-1" /> Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
