export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Failed';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
}
