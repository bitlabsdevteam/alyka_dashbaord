// src/app/(app)/reports/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BarChartHorizontalBig, AlertCircle } from 'lucide-react'; // Added BarChartHorizontalBig and AlertCircle
import { useLanguage } from '@/context/language-context';
// Placeholder for future: import { Button } from '@/components/ui/button';
// Placeholder for future: import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Placeholder type for report items - this would be more defined if reports were stored
interface ReportListItem {
  id: string;
  name: string;
  type: 'Sales' | 'Trend Analysis';
  dateGenerated: Date;
  actions?: React.ReactNode; // For download/view buttons
}

export default function ReportsPage() {
  const { t } = useLanguage();
  const [generatedReports, setGeneratedReports] = React.useState<ReportListItem[]>([]);

  // In a real application, you would fetch these from a backend or state management
  React.useEffect(() => {
    // Mock data for demonstration - this list would be populated by actual report generation events
    // For now, it will be empty as per the current implementation where reports are downloaded directly.
    setGeneratedReports([]); 
  }, []);

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            {t('reportsPage.title')}
          </CardTitle>
          <CardDescription>
            {t('reportsPage.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BarChartHorizontalBig className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                {t('reportsPage.noReports')}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {/* You can generate Sales Reports from the Forecast page. */}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* This section would render a list or table of reports if they were stored */}
              {/* 
              Example for future:
              <h3 className="text-xl font-semibold">{t('reportsPage.salesReportSectionTitle')}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Date Generated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedReports.filter(r => r.type === 'Sales').map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.dateGenerated.toLocaleDateString()}</TableCell>
                      <TableCell><Button size="sm">Download</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> 
              */}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Informational Card about report generation process */}
      <Card className="shadow-md border-l-4 border-blue-500">
        <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600"/>
                How to Generate Reports
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground">
                Currently, Sales Reports (as CSV files) can be generated and downloaded directly from the <strong>Forecast</strong> page using the chat interface by typing <code className="bg-muted px-1 py-0.5 rounded text-xs">help me to generate reports</code>.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
                Future enhancements will allow Trend Analysis reports to be generated and listed here as well.
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
