'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line, BarChart, Bar, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { ShoppingCart, DollarSign, TrendingUp, Package } from 'lucide-react'; // Using Package for units
import { useLanguage } from '@/context/language-context';
import { format, subMonths, startOfMonth } from 'date-fns';

interface DetailedPosEntry {
  id: string;
  monthYear: string; // "Jan 2023"
  productNameKey: keyof Translations['posSalesPage']['products']; // Key for localization
  categoryKey: keyof Translations['posSalesPage']['categories'];   // Key for localization
  sku: string;
  unitsSold: number;
  revenue: number;
  posName: 'Smartregi';
}

// Generate mock data from Jan 2023 to May 2025
const generateMockPosData = (): DetailedPosEntry[] => {
  const data: DetailedPosEntry[] = [];
  const productKeys: Array<keyof Translations['posSalesPage']['products']> = [
    'woolCoat', 'silkBlouse', 'denimJeans', 'summerDress', 'leatherBag', 'sneakers'
  ];
  const productCategoryMap: Record<keyof Translations['posSalesPage']['products'], keyof Translations['posSalesPage']['categories']> = {
    'woolCoat': 'outerwear',
    'silkBlouse': 'tops',
    'denimJeans': 'bottoms',
    'summerDress': 'dresses',
    'leatherBag': 'accessories',
    'sneakers': 'footwear',
  };
  const productSkuMap: Record<keyof Translations['posSalesPage']['products'], string> = {
    'woolCoat': 'SKUWC001',
    'silkBlouse': 'SKUSB002',
    'denimJeans': 'SKUDJ003',
    'summerDress': 'SKUSD004',
    'leatherBag': 'SKULB005',
    'sneakers': 'SKUFS006',
  };

  let idCounter = 1;
  const endDate = startOfMonth(new Date(2025, 4, 1)); // May 2025
  let currentDate = startOfMonth(new Date(2023, 0, 1)); // Jan 2023

  while (currentDate <= endDate) {
    for (const productNameKey of productKeys) {
      const unitsSold = Math.floor(Math.random() * (50 - 10 + 1)) + 10; // 10-50 units
      const pricePerUnit = Math.floor(Math.random() * (200 - 50 + 1)) + 50; // $50-$200
      const revenue = unitsSold * pricePerUnit;
      
      data.push({
        id: `pos-${idCounter++}`,
        monthYear: format(currentDate, 'MMM yyyy'),
        productNameKey,
        categoryKey: productCategoryMap[productNameKey],
        sku: productSkuMap[productNameKey],
        unitsSold: unitsSold,
        revenue: revenue,
        posName: 'Smartregi',
      });
    }
    currentDate = startOfMonth(subMonths(currentDate, -1)); // Move to next month
  }
  return data;
};

const allDetailedPosData = generateMockPosData();

export default function PosSalesPage() {
  const { t } = useLanguage();

  const summaryStats = useMemo(() => {
    const totalRevenue = allDetailedPosData.reduce((sum, item) => sum + item.revenue, 0);
    const totalUnitsSold = allDetailedPosData.reduce((sum, item) => sum + item.unitsSold, 0);
    
    const currentMonthStr = format(new Date(2025, 4, 1), 'MMM yyyy'); // May 2025
    const prevMonthStr = format(subMonths(new Date(2025, 4, 1), 1), 'MMM yyyy'); // Apr 2025

    const currentMonthRevenue = allDetailedPosData
      .filter(item => item.monthYear === currentMonthStr)
      .reduce((sum, item) => sum + item.revenue, 0);
    const prevMonthRevenue = allDetailedPosData
      .filter(item => item.monthYear === prevMonthStr)
      .reduce((sum, item) => sum + item.revenue, 0);
    
    const revenueChange = prevMonthRevenue > 0 
      ? ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100 
      : (currentMonthRevenue > 0 ? 100 : 0);

    const averageOrderValue = totalUnitsSold > 0 ? totalRevenue / totalUnitsSold : 0; // Simplified AOV

    // For AOV change, let's mock it or use a simpler logic
     const currentMonthUnits = allDetailedPosData
      .filter(item => item.monthYear === currentMonthStr)
      .reduce((sum, item) => sum + item.unitsSold, 0);
    const prevMonthUnits = allDetailedPosData
      .filter(item => item.monthYear === prevMonthStr)
      .reduce((sum, item) => sum + item.unitsSold, 0);

    const currentMonthAOV = currentMonthUnits > 0 ? currentMonthRevenue / currentMonthUnits : 0;
    const prevMonthAOV = prevMonthUnits > 0 ? prevMonthRevenue / prevMonthUnits : 0;
    const aovChange = prevMonthAOV > 0 ? ((currentMonthAOV - prevMonthAOV) / prevMonthAOV) * 100 : (currentMonthAOV > 0 ? 100 : 0);


    return {
      totalRevenue,
      totalUnitsSold,
      revenueChange,
      averageOrderValue,
      aovChange,
    };
  }, []);

  const monthlySalesChartData = useMemo(() => {
    const salesByMonth: { [monthYear: string]: { sales: number; units: number } } = {};
    allDetailedPosData.forEach(item => {
      if (!salesByMonth[item.monthYear]) {
        salesByMonth[item.monthYear] = { sales: 0, units: 0 };
      }
      salesByMonth[item.monthYear].sales += item.revenue;
      salesByMonth[item.monthYear].units += item.unitsSold;
    });
    return Object.entries(salesByMonth)
      .map(([monthYear, data]) => ({ monthYear, ...data }))
      .sort((a,b) => new Date(a.monthYear).getTime() - new Date(b.monthYear).getTime()); // Ensure chronological order
  }, []);

  const chartConfigSales: ChartConfig = {
    sales: { label: t('posSalesPage.chart.salesLabel'), color: "hsl(var(--primary))" },
    units: { label: t('posSalesPage.chart.unitsLabel'), color: "hsl(var(--accent))" },
  };

  // Display only the last 12 months of detailed data for brevity in the table, or a selection.
  // For this example, let's take a sample from the most recent data.
  const recentDetailedData = allDetailedPosData.slice(-60).reverse(); // Last 60 entries, newest first

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
            {t('posSalesPage.title')}
          </CardTitle>
          <CardDescription>
            {t('posSalesPage.description')}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('posSalesPage.totalRevenue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryStats.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className={`text-xs ${summaryStats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summaryStats.revenueChange >= 0 ? t('posSalesPage.comparison.increasePrefix') : ''}
              {summaryStats.revenueChange.toFixed(1)}% {t('posSalesPage.comparison.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('posSalesPage.totalUnitsSold')}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalUnitsSold.toLocaleString()}</div>
            {/* Placeholder for units change, as logic is similar to revenue and can be complex */}
             <p className="text-xs text-muted-foreground">{t('posSalesPage.comparison.increasePrefix')}15.5% {t('posSalesPage.comparison.fromLastMonth')}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('posSalesPage.averageOrderValue')}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryStats.averageOrderValue.toFixed(2)}</div>
             <p className={`text-xs ${summaryStats.aovChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {summaryStats.aovChange >= 0 ? t('posSalesPage.comparison.increasePrefix') : ''}
              {summaryStats.aovChange.toFixed(1)}% {t('posSalesPage.comparison.fromLastMonth')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t('posSalesPage.monthlySalesPerformance')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigSales} className="h-[350px] w-full">
            <LineChart data={monthlySalesChartData} accessibilityLayer margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="monthYear" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" minTickGap={30} tickFormatter={(value) => value.substring(0,3)}/>
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tickFormatter={(value) => `$${(value/1000)}k`} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
              <RechartsTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-sales)" }} activeDot={{ r: 6 }} name={t('posSalesPage.chart.salesLabel')} />
              <Line yAxisId="right" type="monotone" dataKey="units" stroke="var(--color-units)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-units)" }} activeDot={{ r: 6 }} name={t('posSalesPage.chart.unitsLabel')} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t('posSalesPage.detailedSalesData')}</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[600px] overflow-y-auto"> {/* Increased max-height */}
          {recentDetailedData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('posSalesPage.tableHeaders.monthYear')}</TableHead>
                  <TableHead>{t('posSalesPage.tableHeaders.productName')}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t('posSalesPage.tableHeaders.category')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('posSalesPage.tableHeaders.sku')}</TableHead>
                  <TableHead className="text-right">{t('posSalesPage.tableHeaders.unitsSold')}</TableHead>
                  <TableHead className="text-right">{t('posSalesPage.tableHeaders.revenue')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('posSalesPage.tableHeaders.posName')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDetailedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.monthYear}</TableCell>
                    <TableCell className="font-medium">{t(`posSalesPage.products.${item.productNameKey}` as any)}</TableCell>
                    <TableCell className="hidden sm:table-cell">{t(`posSalesPage.categories.${item.categoryKey}` as any)}</TableCell>
                    <TableCell className="hidden md:table-cell">{item.sku}</TableCell>
                    <TableCell className="text-right">{item.unitsSold.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.revenue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</TableCell>
                    <TableCell className="hidden lg:table-cell">{item.posName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>{t('posSalesPage.noData')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
