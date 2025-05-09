// analytics/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LineChart as LucideLineChart, Palette, Newspaper, TrendingUp } from 'lucide-react'; // Renamed to avoid conflict
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, CartesianGrid, Line } from 'recharts'; // Added Line import
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context'; // Import useLanguage

const mockTrendData = [
  { monthYear: 'Jan 2023', popularity: 30 },
  { monthYear: 'Feb 2023', popularity: 35 },
  { monthYear: 'Mar 2023', popularity: 45 },
  { monthYear: 'Apr 2023', popularity: 40 },
  { monthYear: 'May 2023', popularity: 50 },
  { monthYear: 'Jun 2023', popularity: 55 },
  { monthYear: 'Jul 2023', popularity: 60 },
  { monthYear: 'Aug 2023', popularity: 58 },
  { monthYear: 'Sep 2023', popularity: 62 },
  { monthYear: 'Oct 2023', popularity: 70 },
  { monthYear: 'Nov 2023', popularity: 75 },
  { monthYear: 'Dec 2023', popularity: 80 },
  { monthYear: 'Jan 2024', popularity: 85 },
  { monthYear: 'Feb 2024', popularity: 82 },
  { monthYear: 'Mar 2024', popularity: 88 },
  { monthYear: 'Apr 2024', popularity: 90 },
];

const mockColorData = [
  { name: 'Cerulean Blue', value: 400 },
  { name: 'Dusty Rose', value: 300 },
  { name: 'Olive Green', value: 200 },
  { name: 'Mustard Yellow', value: 150 },
  { name: 'Lavender', value: 250 },
];
const COLORS = ['#2E9AFE', '#FF8042', '#00C49F', '#FFBB28', '#A42EFF'];

const chartConfigTrend = {
  popularity: {
    label: "Popularity", // Will be translated
    color: "hsl(var(--primary))",
  },
};

const chartConfigColor = (t: (key: string) => string) => ({
  value: {
    label: t('analyticsPage.colorPopularity'),
  },
  ...mockColorData.reduce((acc, item, index) => {
    // For simplicity, color names are not translated here, but could be if needed
    acc[item.name] = { label: item.name, color: COLORS[index % COLORS.length] };
    return acc;
  }, {} as any)
});


export default function AnalyticsPage() {
  const { t } = useLanguage(); // Use the language hook

  // Simplified chart config for trend, label will be translated
  const trendChartConfig = {
    popularity: {
      label: t('analyticsPage.popularity'),
      color: "hsl(var(--primary))",
    },
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
            src="https://picsum.photos/800/300"
            alt="Fashion Trend GALA 2024"
            width={800}
            height={300}
            className="w-full h-auto rounded-lg object-cover"
            data-ai-hint="fashion event"
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
              {t('analyticsPage.trendPopularityTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={trendChartConfig} className="h-[300px] w-full">
              <LineChart data={mockTrendData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey="monthYear" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  interval="preserveStartEnd"
                  minTickGap={20}
                  tickFormatter={(value) => value.substring(0,3)} // Show only month initials
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <RechartsTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="popularity" 
                  stroke="var(--color-popularity)" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: "var(--color-popularity)" }} 
                  activeDot={{ r: 6 }}
                  name={t('analyticsPage.popularity')}
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
