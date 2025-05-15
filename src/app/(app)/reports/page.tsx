
// src/app/(app)/reports/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BarChartHorizontalBig, Download } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { StoredReport } from '@/types';
import { format } from 'date-fns';

const REPORTS_STORAGE_KEY = 'alyka-generated-reports';

export default function ReportsPage() {
  const { t } = useLanguage();
  const [generatedReports, setGeneratedReports] = React.useState<StoredReport[]>([]);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    try {
      const storedReportsRaw = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (storedReportsRaw) {
        setGeneratedReports(JSON.parse(storedReportsRaw));
      }
    } catch (error) {
      console.error("Error reading reports from localStorage:", error);
      // Optionally clear corrupted data or notify user
      // localStorage.removeItem(REPORTS_STORAGE_KEY); 
    }
  }, []);

  const handleDownload = (report: StoredReport) => {
    if (report.csvData && report.name) {
      const blob = new Blob([report.csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', report.name);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }
  };

  if (!isMounted) {
     return (
        <div className="space-y-6">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="h-8 w-1/2 animate-pulse rounded bg-muted mb-2"></div>
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted"></div>
                </CardHeader>
                <CardContent>
                    <div className="h-40 animate-pulse rounded bg-muted"></div>
                </CardContent>
            </Card>
        </div>
     );
  }


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
                {t('reportsPage.generateInstruction')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('reportsPage.tableHeaders.name')}</TableHead>
                    <TableHead>{t('reportsPage.tableHeaders.type')}</TableHead>
                    <TableHead>{t('reportsPage.tableHeaders.dateGenerated')}</TableHead>
                    <TableHead className="text-right">{t('reportsPage.tableHeaders.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.name}</TableCell>
                      <TableCell>{report.type === 'Sales Report' ? t('reportsPage.reportTypes.sales') : t('reportsPage.reportTypes.trend')}</TableCell>
                      <TableCell>{format(new Date(report.dateGenerated), 'PPpp')}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report)}>
                          <Download className="mr-2 h-4 w-4" />
                          {t('reportsPage.buttons.downloadCsv')}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
