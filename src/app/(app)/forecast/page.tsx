// src/app/(app)/forecast/page.tsx
'use client';

import { useState } from 'react';
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
  { value: 'SKU001', label: "Men's Classic White T-Shirt", currentStock: 120 },
  { value: 'SKU002', label: "Women's Skinny Blue Jeans", currentStock: 80 },
  { value: 'SKU003', label: "Unisex Oversized Hoodie - Black", currentStock: 150 },
  { value: 'SKU004', label: "Children's Striped Cotton PJs", currentStock: 200 },
  { value: 'SKU005', label: "Luxury Silk Scarf - Floral Print", currentStock: 50 },
];

export default function ForecastPage() {
  const { t } = useLanguage();
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
      });
    }
  };

  const chartData = salesForecast
    ? [
        { period: t('forecastPage.chart.currentLabel'), forecastedStock: salesForecast.currentStock, currentStockLine: salesForecast.currentStock },
        ...salesForecast.forecastData.map(fd => ({ 
            period: fd.period, 
            forecastedStock: fd.forecastedStock,
            currentStockLine: salesForecast.currentStock // For a constant comparison line
        }))
      ]
    : [];
  
  const chartConfig: ChartConfig = {
    forecastedStock: {
      label: t('forecastPage.chart.forecastedStockLabel'),
      color: "hsl(var(--chart-1))",
    },
    currentStockLine: {
        label: t('forecastPage.chart.currentStockLabel'),
        color: "hsl(var(--chart-2))",
    }
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
              <BarChartBig className="mr-2 h-6 w-6 text-primary" />
              {t('forecastPage.forecastTitle', { skuName: salesForecast.skuName })}
            </CardTitle>
            <CardDescription>
                {t('forecastPage.currentStockValueLabel')}: {salesForecast.currentStock}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">{t('forecastPage.chart.title')}</h3>
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <LineChart data={chartData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <RechartsTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Legend />
                  <Line type="monotone" dataKey="forecastedStock" stroke="var(--color-forecastedStock)" strokeWidth={2} dot={{ r: 3, fill: "var(--color-forecastedStock)"}} activeDot={{ r: 5 }} name={t('forecastPage.chart.forecastedStockLabel')} />
                  <Line type="monotone" dataKey="currentStockLine" stroke="var(--color-currentStockLine)" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={false} name={t('forecastPage.chart.currentStockLabel')} />
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
