'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Task, TaskStatus } from '@/types';
import { ListChecks, CheckCircle2, XCircle, CircleDotDashed, Hourglass } from 'lucide-react';
import { format } from 'date-fns';

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Generate Q3 Trend Report',
    description: 'Analyze menswear trends for Fall/Winter 2024 focusing on European market.',
    status: 'Completed',
    createdAt: new Date(2023, 10, 15, 9, 30),
    completedAt: new Date(2023, 10, 15, 14, 0),
  },
  {
    id: '2',
    name: 'Forecast Q4 Sales',
    description: 'Based on Q3 trend report and historical data for womenswear.',
    status: 'In Progress',
    createdAt: new Date(2023, 11, 1, 10, 0),
  },
  {
    id: '3',
    name: 'Analyze Consumer Sentiment - New Collection',
    description: 'Process social media data for feedback on the new sustainable line.',
    status: 'Pending',
    createdAt: new Date(2023, 11, 5, 11, 15),
  },
  {
    id: '4',
    name: 'Generate Competitor Analysis Report',
    description: 'Focus on pricing and material usage of top 5 competitors.',
    status: 'Failed',
    createdAt: new Date(2023, 10, 20, 14, 0),
    completedAt: new Date(2023, 10, 20, 16, 30),
  },
];

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  let Icon = Hourglass;

  switch (status) {
    case 'Completed':
      variant = 'default'; // Will use primary color
      Icon = CheckCircle2;
      break;
    case 'In Progress':
      variant = 'secondary'; // Will use accent color (teal-ish) for this in theme
      Icon = CircleDotDashed;
      break;
    case 'Pending':
      variant = 'outline';
      Icon = Hourglass;
      break;
    case 'Failed':
      variant = 'destructive';
      Icon = XCircle;
      break;
  }

  return (
    <Badge variant={variant} className="flex items-center gap-1 text-xs">
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
};


export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate API call
    setTasks(mockTasks);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ListChecks className="mr-2 h-6 w-6 text-primary" />
            Task Manager
          </CardTitle>
          <CardDescription>
            Track the status and details of all AI-driven and manual tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Name</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Created At</TableHead>
                <TableHead className="hidden sm:table-cell">Completed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{task.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={task.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {format(task.createdAt, 'PPpp')}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {task.completedAt ? format(task.completedAt, 'PPpp') : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
