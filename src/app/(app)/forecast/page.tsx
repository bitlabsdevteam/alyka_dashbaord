// src/app/(app)/forecast/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { forecastSales, type ForecastSalesOutput, type ForecastSalesInput } from '@/ai/flows/forecast-sales';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, TrendingUpIcon, PackageSearch, BarChartBig, Info, Lightbulb } from 'lucide-react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { useLanguage } from '@/context/language-context';

interface SkuItem {
  value: string;
  label: string;
  currentStock: number;
}

const mockSkus: SkuItem[] = [
  { value: 'SKU001', label: "Men's Classic White T-Shirt", currentStock: 1200 },
  { value: 'SKU002', label: "Women's Skinny Blue Jeans", currentStock: 800 },
  { value: 'SKU003', label: "Unisex Oversized Hoodie - Black", currentStock: 1500 },
  { value: 'SKU004', label: "Children's Striped Cotton PJs", currentStock: 2000 },
  { value: 'SKU005', label: "Luxury Silk Scarf - Floral Print", currentStock: 500 },
];

export default function ForecastPage() {
  const { t, language } = useLanguage(); // Added language
  const [selectedSkuValue, setSelectedSkuValue] = useState<string | undefined>(undefined);
  const [forecastHorizon, setForecastHorizon] = useState<string>('next 3 months');
  const { toast } = useToast();

  const { mutate, data: salesForecast, isPending, error } = useMutation<ForecastSalesOutput, Error, ForecastSalesInput>({
    mutationFn: forecastSales,
    onSuccess: (data) => {
      toast({
        title: t('forecastPage.toast.successTitle'),
        description: t('forecastPage.toast.successDescription', { skuName: data.skuName }),
      });
    },
    onError: (err) => {
      toast({
        title: t('forecastPage.toast.errorTitle'),
        description: err.message || t('forecastPage.toast.errorDescription'),
        variant: 'destructive',
      });
    },
  });

  const handleGenerateForecast = () => {
    if (!selectedSkuValue) {
      toast({
        title: t('forecastPage.toast.skuMissingTitle'),
        description: t('forecastPage.toast.skuMissingDescription'),
        variant: 'destructive',
      });
      return;
    }
    const skuDetails = mockSkus.find(s => s.value === selectedSkuValue);
    if (skuDetails) {
      mutate({
        skuName: skuDetails.label,
        currentStock: skuDetails.currentStock,
        forecastHorizon: forecastHorizon,
        targetLanguage: language, // Pass the current language
      });
    }
  };

  const chartData = useMemo(() => {
    if (!salesForecast || !salesForecast.forecastData) return [];
    
    const calculatedSales = [];
    let lastStock = salesForecast.currentStock;

    for (const dataPoint of salesForecast.forecastData) {
      // Sales for the period is the reduction in stock
      const salesForPeriod = lastStock - dataPoint.forecastedStock;
      calculatedSales.push({ 
        period: dataPoint.period, 
        // Ensure sales are not negative (if stock weirdly increases)
        // This reflects the number of units sold/demanded in this period
        sales: Math.max(0, salesForPeriod) 
      });
      lastStock = dataPoint.forecastedStock;
    }
    return calculatedSales;
  }, [salesForecast]);
  
  const chartConfig: ChartConfig = {
    sales: {
      label: t('forecastPage.chart.salesLabel'), // Updated label
      color: "hsl(var(--chart-1))",
    },
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <PackageSearch className="mr-2 h-6 w-6 text-primary" />
            {t('forecastPage.selectSkuTitle')}
          </CardTitle>
          <CardDescription>
            {t('forecastPage.selectSkuDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="skuSelect">{t('forecastPage.skuLabel')}</Label>
            <Select value={selectedSkuValue} onValueChange={setSelectedSkuValue}>
              <SelectTrigger id="skuSelect" className="w-full text-base">
                <SelectValue placeholder={t('forecastPage.selectSkuPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {mockSkus.map(sku => (
                  <SelectItem key={sku.value} value={sku.value} className="text-base">
                    {sku.label} ({t('forecastPage.currentStockLabel')}: {sku.currentStock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="forecastHorizon">{t('forecastPage.forecastHorizonLabel')}</Label>
            <Input
              id="forecastHorizon"
              placeholder="e.g., next 6 weeks, next 2 quarters"
              value={forecastHorizon}
              onChange={(e) => setForecastHorizon(e.target.value)}
              className="text-base"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateForecast} disabled={isPending || !selectedSkuValue} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('forecastPage.generatingButton')}
              </>
            ) : (
              t('forecastPage.generateButton')
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>{t('forecastPage.errorAlertTitle')}</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {salesForecast && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUpIcon className="mr-2 h-6 w-6 text-primary" /> {/* Changed icon */}
              {t('forecastPage.forecastTitle', { skuName: salesForecast.skuName })}
            </CardTitle>
            <CardDescription>
                {t('forecastPage.currentStockValueLabel')}: {salesForecast.currentStock}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('forecastPage.chart.demandTitle')}</h3>
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <LineChart data={chartData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={8}
                    label={{ value: t('forecastPage.chart.yAxisDemandLabel'), angle: -90, position: 'insideLeft', offset: 0, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
                  />
                  <RechartsTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" // Changed from forecastedStock to sales
                    stroke="var(--color-sales)" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: "var(--color-sales)"}}  // Slightly larger dot
                    activeDot={{ r: 6 }} // Slightly larger active dot
                    name={t('forecastPage.chart.salesLabel')} // Updated name for legend
                  />
                </LineChart>
              </ChartContainer>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center"><Info className="mr-2 h-5 w-5 text-muted-foreground" />{t('forecastPage.reasoningTitle')}</h3>
              <p className="text-base whitespace-pre-wrap">{salesForecast.reasoning}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-muted-foreground" />{t('forecastPage.recommendationsTitle')}</h3>
              <p className="text-base whitespace-pre-wrap">{salesForecast.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
