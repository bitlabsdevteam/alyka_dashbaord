// src/app/(app)/pos-sales/page.tsx
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { ShoppingCart, DollarSign, Package, Store as StoreIcon } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { format, subMonths, startOfMonth } from 'date-fns';
import type { Translations, TranslationKey } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';


const storeLocations = ['Tokyo', 'Osaka', 'Hiroshima'] as const;
type StoreLocation = typeof storeLocations[number];

interface DetailedPosEntry {
  id: string;
  monthYear: string; 
  productNameKey: keyof Translations['posSalesPage']['products']; 
  categoryKey: keyof Translations['posSalesPage']['categories'];   
  sku: string;
  unitsSold: number;
  revenue: number;
  storeLocation: StoreLocation;
  posName: 'Smartregi';
}

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
      const randomStoreLocation = storeLocations[Math.floor(Math.random() * storeLocations.length)];
      
      data.push({
        id: `pos-${idCounter++}`,
        monthYear: format(currentDate, 'MMM yyyy'),
        productNameKey,
        categoryKey: productCategoryMap[productNameKey],
        sku: productSkuMap[productNameKey],
        unitsSold: unitsSold,
        revenue: revenue,
        storeLocation: randomStoreLocation,
        posName: 'Smartregi',
      });
    }
    currentDate = startOfMonth(subMonths(currentDate, -1)); // Move to next month
  }
  return data;
};

const storeOptions: Array<{ value: string; labelKey: TranslationKey }> = [
  { value: 'all', labelKey: 'posSalesPage.stores.all' },
  { value: 'Tokyo', labelKey: 'posSalesPage.stores.tokyo' },
  { value: 'Osaka', labelKey: 'posSalesPage.stores.osaka' },
  { value: 'Hiroshima', labelKey: 'posSalesPage.stores.hiroshima' },
];


export default function PosSalesPage() {
  const { t } = useLanguage();
  const [allDetailedPosData, setAllDetailedPosData] = useState<DetailedPosEntry[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string>('all');

  useEffect(() => {
    setAllDetailedPosData(generateMockPosData());
    setIsMounted(true);
  }, []);

  const filteredData = useMemo(() => {
    if (selectedStore === 'all') {
      return allDetailedPosData;
    }
    return allDetailedPosData.filter(item => item.storeLocation === selectedStore);
  }, [allDetailedPosData, selectedStore]);

  const summaryStats = useMemo(() => {
    const dataToSummarize = filteredData;
    if (dataToSummarize.length === 0) {
        return {
            totalRevenue: 0,
            totalUnitsSold: 0,
            revenueChange: 0,
            averageOrderValue: 0,
            aovChange: 0,
        };
    }
    const totalRevenue = dataToSummarize.reduce((sum, item) => sum + item.revenue, 0);
    const totalUnitsSold = dataToSummarize.reduce((sum, item) => sum + item.unitsSold, 0);
    
    // For change calculation, we use all data to determine current and previous month regardless of store selection
    // to reflect overall company performance, not just selected store.
    // If store-specific change is needed, this logic should use 'dataToSummarize' for these filters too.
    const currentMonthStr = format(new Date(2025, 4, 1), 'MMM yyyy'); 
    const prevMonthStr = format(subMonths(new Date(2025, 4, 1), 1), 'MMM yyyy');

    const currentMonthRevenueAll = allDetailedPosData
      .filter(item => item.monthYear === currentMonthStr)
      .reduce((sum, item) => sum + item.revenue, 0);
    const prevMonthRevenueAll = allDetailedPosData
      .filter(item => item.monthYear === prevMonthStr)
      .reduce((sum, item) => sum + item.revenue, 0);
    
    const revenueChange = prevMonthRevenueAll > 0 
      ? ((currentMonthRevenueAll - prevMonthRevenueAll) / prevMonthRevenueAll) * 100 
      : (currentMonthRevenueAll > 0 ? 100 : 0);

    const averageOrderValue = totalUnitsSold > 0 ? totalRevenue / totalUnitsSold : 0;

     const currentMonthUnitsAll = allDetailedPosData
      .filter(item => item.monthYear === currentMonthStr)
      .reduce((sum, item) => sum + item.unitsSold, 0);
    const prevMonthUnitsAll = allDetailedPosData
      .filter(item => item.monthYear === prevMonthStr)
      .reduce((sum, item) => sum + item.unitsSold, 0);

    const currentMonthAOVAll = currentMonthUnitsAll > 0 ? currentMonthRevenueAll / currentMonthUnitsAll : 0;
    const prevMonthAOVAll = prevMonthUnitsAll > 0 ? prevMonthRevenueAll / prevMonthUnitsAll : 0;
    const aovChange = prevMonthAOVAll > 0 ? ((currentMonthAOVAll - prevMonthAOVAll) / prevMonthAOVAll) * 100 : (currentMonthAOVAll > 0 ? 100 : 0);

    return {
      totalRevenue,
      totalUnitsSold,
      revenueChange,
      averageOrderValue,
      aovChange,
    };
  }, [filteredData, allDetailedPosData]);

  const monthlySalesChartData = useMemo(() => {
    const dataForChart = filteredData;
    if (dataForChart.length === 0) return [];
    const salesByMonth: { [monthYear: string]: { sales: number; units: number } } = {};
    dataForChart.forEach(item => {
      if (!salesByMonth[item.monthYear]) {
        salesByMonth[item.monthYear] = { sales: 0, units: 0 };
      }
      salesByMonth[item.monthYear].sales += item.revenue;
      salesByMonth[item.monthYear].units += item.unitsSold;
    });
    return Object.entries(salesByMonth)
      .map(([monthYear, data]) => ({ monthYear, ...data }))
      .sort((a,b) => new Date(a.monthYear).getTime() - new Date(b.monthYear).getTime());
  }, [filteredData]);

  const chartConfigSales: ChartConfig = useMemo(() => ({
    sales: { label: t('posSalesPage.chart.salesLabel'), color: "hsl(var(--primary))" },
    units: { label: t('posSalesPage.chart.unitsLabel'), color: "hsl(var(--accent))" },
  }), [t]);

  const recentDetailedData = useMemo(() => {
    if (filteredData.length === 0) return [];
    // Show more items if filtered
    const itemsToShow = selectedStore === 'all' ? 60 : filteredData.length;
    return filteredData.slice(-itemsToShow).reverse();
  }, [filteredData, selectedStore]);

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <StoreIcon className="mr-2 h-6 w-6 text-primary" />
              {t('posSalesPage.title')}
            </CardTitle>
            <CardDescription>
              {t('posSalesPage.description')}
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="h-10 bg-muted rounded w-1/3 animate-pulse"></div>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-3 bg-muted rounded w-1/4 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/3 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full bg-muted rounded animate-pulse"></div>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-1/4 animate-pulse"></div>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
             <div className="h-40 bg-muted rounded animate-pulse"></div>
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
            <StoreIcon className="mr-2 h-6 w-6 text-primary" />
            {t('posSalesPage.title')}
          </CardTitle>
          <CardDescription>
            {t('posSalesPage.description')}
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <Label htmlFor="storeSelect">{t('posSalesPage.storeSelectLabel')}</Label>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger id="storeSelect" className="w-full md:w-1/3 text-base mt-1">
              <SelectValue placeholder={t('posSalesPage.storeSelectPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {storeOptions.map(option => (
                <SelectItem key={option.value} value={option.value} className="text-base">
                  {t(option.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
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
             <p className="text-xs text-muted-foreground">{t('posSalesPage.comparison.increasePrefix')}15.5% {t('posSalesPage.comparison.fromLastMonth')}</p> {/* This percentage is static, consider making it dynamic */}
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
        <CardContent className="max-h-[600px] overflow-y-auto">
          {recentDetailedData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('posSalesPage.tableHeaders.monthYear')}</TableHead>
                  <TableHead>{t('posSalesPage.tableHeaders.productName')}</TableHead>
                  <TableHead className="hidden sm:table-cell">{t('posSalesPage.tableHeaders.category')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('posSalesPage.tableHeaders.sku')}</TableHead>
                  <TableHead>{t('posSalesPage.tableHeaders.storeLocation')}</TableHead>
                  <TableHead className="text-right">{t('posSalesPage.tableHeaders.unitsSold')}</TableHead>
                  <TableHead className="text-right">{t('posSalesPage.tableHeaders.revenue')}</TableHead>
                  <TableHead>{t('posSalesPage.tableHeaders.po')}</TableHead>
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
                    <TableCell>{item.storeLocation}</TableCell>
                    <TableCell className="text-right">{item.unitsSold.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.revenue.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">{t('posSalesPage.buttons.createPo')}</Button>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{item.posName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="p-4 text-center">{t('posSalesPage.noData')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
