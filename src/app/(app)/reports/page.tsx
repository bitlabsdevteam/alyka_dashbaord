// src/app/(app)/reports/page.tsx
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <FileText className="mr-2 h-6 w-6 text-primary" />
            {t('nav.reports')} {/* Assuming 'nav.reports' is the translation key */}
          </CardTitle>
          <CardDescription>
            {/* Add a description key if needed, e.g., t('reportsPage.description') */}
            This page is under construction. Reports will be available here soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Detailed reports and downloadable documents related to your fashion analytics, forecasts, and sales data will be accessible from this section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
