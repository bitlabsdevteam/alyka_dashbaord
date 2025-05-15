
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Failed';

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
}

export type ReportType = 'Sales Report' | 'Trend Analysis'; // For future use

export interface StoredReport {
  id: string;
  name: string; // This will be the fileName from the flow
  type: ReportType;
  dateGenerated: string; // ISO string date
  csvData: string; // The actual CSV content
}
