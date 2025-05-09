'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Task, TaskStatus } from '@/types';
import { ListChecks, CheckCircle2, XCircle, CircleDotDashed, Hourglass } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/context/language-context';
import type { TranslationKey } from '@/lib/i18n';

interface MockTaskData {
  id: string;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
}

const mockTaskData: MockTaskData[] = [
  {
    id: '1',
    nameKey: 'tasksPage.tasks.q3TrendReport.name',
    descriptionKey: 'tasksPage.tasks.q3TrendReport.description',
    status: 'Completed',
    createdAt: new Date(2023, 10, 15, 9, 30),
    completedAt: new Date(2023, 10, 15, 14, 0),
  },
  {
    id: '2',
    nameKey: 'tasksPage.tasks.q4Sales.name',
    descriptionKey: 'tasksPage.tasks.q4Sales.description',
    status: 'In Progress',
    createdAt: new Date(2023, 11, 1, 10, 0),
  },
  {
    id: '3',
    nameKey: 'tasksPage.tasks.consumerSentiment.name',
    descriptionKey: 'tasksPage.tasks.consumerSentiment.description',
    status: 'Pending',
    createdAt: new Date(2023, 11, 5, 11, 15),
  },
  {
    id: '4',
    nameKey: 'tasksPage.tasks.competitorAnalysis.name',
    descriptionKey: 'tasksPage.tasks.competitorAnalysis.description',
    status: 'Completed', 
    createdAt: new Date(2023, 10, 20, 14, 0),
    completedAt: new Date(2023, 10, 20, 16, 30),
  },
];

const StatusBadge = ({ status, t }: { status: TaskStatus; t: (key: TranslationKey) => string }) => {
  let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'default';
  let Icon = Hourglass;
  let statusText = '';

  switch (status) {
    case 'Completed':
      variant = 'default'; 
      Icon = CheckCircle2;
      statusText = t('tasksPage.status.completed');
      break;
    case 'In Progress':
      variant = 'secondary'; 
      Icon = CircleDotDashed;
      statusText = t('tasksPage.status.inProgress');
      break;
    case 'Pending':
      variant = 'outline';
      Icon = Hourglass;
      statusText = t('tasksPage.status.pending');
      break;
    case 'Failed':
      variant = 'destructive'; 
      Icon = XCircle;
      statusText = t('tasksPage.status.failed');
      break;
  }

  return (
    <Badge variant={variant} className="flex items-center gap-1 text-xs">
      <Icon className="h-3 w-3" />
      {statusText}
    </Badge>
  );
};


export default function TasksPage() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [descriptionText, setDescriptionText] = useState<string | null>(null);

  useEffect(() => {
    const localizedTasks: Task[] = mockTaskData.map(taskData => ({
      ...taskData,
      name: t(taskData.nameKey),
      description: t(taskData.descriptionKey),
    }));
    setTasks(localizedTasks);
    setDescriptionText(t('tasksPage.description'));
  }, [t]);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ListChecks className="mr-2 h-6 w-6 text-primary" />
            {t('tasksPage.title')}
          </CardTitle>
          <CardDescription>
            {descriptionText === null ? <>&nbsp;</> : descriptionText}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('tasksPage.tableHeaders.taskName')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('tasksPage.tableHeaders.description')}</TableHead>
                <TableHead>{t('tasksPage.tableHeaders.status')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('tasksPage.tableHeaders.createdAt')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('tasksPage.tableHeaders.completedAt')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    {t('tasksPage.noTasks')}
                  </TableCell>
                </TableRow>
              )}
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{task.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={task.status} t={t as any} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {format(task.createdAt, 'PPpp')}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {task.completedAt ? format(task.completedAt, 'PPpp') : t('tasksPage.notApplicable')}
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
