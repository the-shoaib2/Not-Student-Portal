"use client";

import { Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ComingSoonCardProps {
  title: string;
  description: string;
  expectedLaunch: string;

  actionText?: string;
}

export function ComingSoonCard({
  title,
  description,
  expectedLaunch,

  actionText = 'Get Notified When Available',
}: ComingSoonCardProps) {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 transition-colors">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <div>
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Coming Soon
          </Badge>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {title}
          </CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>Expected launch: {expectedLaunch}</span>
        </div>
        <Button variant="outline" disabled className="mt-4">
          <span className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {actionText}
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
