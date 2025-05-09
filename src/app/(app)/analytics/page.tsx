// analytics/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Palette, Newspaper, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, CartesianGrid, Line } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

const mockSilhouetteData = [
  { monthYear: 'Jan 2023', aLine: 30, sheath: 40, oversized: 20, bodycon: 35, asymmetrical: 15 },
  { monthYear: 'Feb 2023', aLine: 32, sheath: 42, oversized: 25, bodycon: 30, asymmetrical: 18 },
  { monthYear: 'Mar 2023', aLine: 35, sheath: 38, oversized: 30, bodycon: 28, asymmetrical: 22 },
  { monthYear: 'Apr 2023', aLine: 38, sheath: 35, oversized: 35, bodycon: 30, asymmetrical: 25 },
  { monthYear: 'May 2023', aLine: 42, sheath: 32, oversized: 40, bodycon: 32, asymmetrical: 28 },
  { monthYear: 'Jun 2023', aLine: 45, sheath: 30, oversized: 45, bodycon: 35, asymmetrical: 30 },
  { monthYear: 'Jul 2023', aLine: 48, sheath: 28, oversized: 50, bodycon: 38, asymmetrical: 33 },
  { monthYear: 'Aug 2023', aLine: 50, sheath: 25, oversized: 55, bodycon: 40, asymmetrical: 35 },
  { monthYear: 'Sep 2023', aLine: 52, sheath: 22, oversized: 60, bodycon: 42, asymmetrical: 40 },
  { monthYear: 'Oct 2023', aLine: 55, sheath: 20, oversized: 65, bodycon: 45, asymmetrical: 45 },
  { monthYear: 'Nov 2023', aLine: 58, sheath: 18, oversized: 68, bodycon: 42, asymmetrical: 48 },
  { monthYear: 'Dec 2023', aLine: 60, sheath: 15, oversized: 70, bodycon: 40, asymmetrical: 50 },
  { monthYear: 'Jan 2024', aLine: 62, sheath: 18, oversized: 72, bodycon: 38, asymmetrical: 52 },
  { monthYear: 'Feb 2024', aLine: 65, sheath: 20, oversized: 75, bodycon: 35, asymmetrical: 55 },
  { monthYear: 'Mar 2024', aLine: 62, sheath: 22, oversized: 78, bodycon: 38, asymmetrical: 58 },
  { monthYear: 'Apr 2024', aLine: 60, sheath: 25, oversized: 80, bodycon: 40, asymmetrical: 60 },
];


const mockColorData = [
  { name: 'Cerulean Blue', value: 400 },
  { name: 'Dusty Rose', value: 300 },
  { name: 'Olive Green', value: 200 },
  { name: 'Mustard Yellow', value: 150 },
  { name: 'Lavender', value: 250 },
];
const COLORS = ['#2E9AFE', '#FF8042', '#00C49F', '#FFBB28', '#A42EFF'];


const chartConfigColor = (t: (key: string) => string) => ({
  value: {
    label: t('analyticsPage.colorPopularity'),
  },
  ...mockColorData.reduce((acc, item, index) => {
    acc[item.name] = { label: item.name, color: COLORS[index % COLORS.length] };
    return acc;
  }, {} as any)
});


export default function AnalyticsPage() {
  const { t } = useLanguage();

  const silhouetteChartConfig = {
    aLine: { label: t('analyticsPage.silhouette.aLine'), color: "hsl(var(--chart-1))" },
    sheath: { label: t('analyticsPage.silhouette.sheath'), color: "hsl(var(--chart-2))" },
    oversized: { label: t('analyticsPage.silhouette.oversized'), color: "hsl(var(--chart-3))" },
    bodycon: { label: t('analyticsPage.silhouette.bodycon'), color: "hsl(var(--chart-4))" },
    asymmetrical: { label: t('analyticsPage.silhouette.asymmetrical'), color: "hsl(var(--chart-5))" },
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Newspaper className="mr-2 h-6 w-6 text-primary" />
            {t('analyticsPage.latestTrendTitle')}
          </CardTitle>
          <CardDescription>
            {t('analyticsPage.latestTrendDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Image
            src="https://picsum.photos/800/450"
            alt="Fashion Trend GALA 2025"
            width={800}
            height={450}
            className="w-full h-auto rounded-lg object-cover"
            data-ai-hint="met gala fashion"
          />
          <h3 className="text-xl font-semibold">{t('analyticsPage.galaArticle.title')}</h3>
          <p className="text-base text-muted-foreground">
            {t('analyticsPage.galaArticle.paragraph1')}
          </p>
          <p className="text-base text-muted-foreground">
            {t('analyticsPage.galaArticle.paragraph2')}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              {t('analyticsPage.silhouettePopularityTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={silhouetteChartConfig} className="h-[300px] w-full">
              <LineChart data={mockSilhouetteData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey="monthYear" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  interval="preserveStartEnd"
                  minTickGap={20}
                  tickFormatter={(value) => value.substring(0,3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <RechartsTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="aLine" 
                  stroke="var(--color-aLine)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-aLine)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.aLine')}
                />
                <Line 
                  type="monotone" 
                  dataKey="sheath" 
                  stroke="var(--color-sheath)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-sheath)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.sheath')}
                />
                <Line 
                  type="monotone" 
                  dataKey="oversized" 
                  stroke="var(--color-oversized)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-oversized)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.oversized')}
                />
                <Line 
                  type="monotone" 
                  dataKey="bodycon" 
                  stroke="var(--color-bodycon)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-bodycon)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.bodycon')}
                />
                <Line 
                  type="monotone" 
                  dataKey="asymmetrical" 
                  stroke="var(--color-asymmetrical)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-asymmetrical)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.asymmetrical')}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-primary" />
              {t('analyticsPage.colorTrendsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigColor(t)} className="h-[300px] w-full">
              <PieChart accessibilityLayer>
                <RechartsTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend />
                <Pie data={mockColorData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {mockColorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
