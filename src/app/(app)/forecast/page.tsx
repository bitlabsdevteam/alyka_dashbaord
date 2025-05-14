// src/app/(app)/forecast/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { forecastSales, type ForecastSalesOutput, type ForecastSalesInput } from '@/ai/flows/forecast-sales';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, TrendingUpIcon, PackageSearch, Info, Lightbulb } from 'lucide-react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { useLanguage } from '@/context/language-context';
import type { TranslationKey, Translations } from '@/lib/i18n';
import { translations } from '@/lib/i18n';

interface SkuItem {
  value: string;
  labelKey: TranslationKey;
  currentStock: number;
}

const mockSkus: SkuItem[] = [
  { value: 'SKU001', labelKey: 'forecastPage.skus.classicWhiteTShirt', currentStock: 1200 },
  { value: 'SKU002', labelKey: 'forecastPage.skus.skinnyBlueJeans', currentStock: 800 },
  { value: 'SKU003', labelKey: 'forecastPage.skus.oversizedHoodieBlack', currentStock: 1500 },
  { value: 'SKU004', labelKey: 'forecastPage.skus.stripedCottonPJs', currentStock: 2000 },
  { value: 'SKU005', labelKey: 'forecastPage.skus.luxurySilkScarfFloral', currentStock: 500 },
];

export default function ForecastPage() {
  const { t, language } = useLanguage();
  const [selectedSkuValue, setSelectedSkuValue] = useState<string | undefined>(undefined);
  const [forecastMonths, setForecastMonths] = useState<number>(3);
  const [groundVoiceInput, setGroundVoiceInput] = useState<string>(''); // Renamed from yourVoiceCount
  const { toast } = useToast();

  const [groundVoiceLabelText, setGroundVoiceLabelText] = useState<string | null>(null);
  const [skuLabelText, setSkuLabelText] = useState<string | null>(null);
  const [selectSkuPlaceholderText, setSelectSkuPlaceholderText] = useState<string | null>(null);
  const [currentStockLabelText, setCurrentStockLabelText] = useState<string | null>(null);
  const [forecastHorizonLabelText, setForecastHorizonLabelText] = useState<string | null>(null);
  const [groundVoicePlaceholderText, setGroundVoicePlaceholderText] = useState<string | null>(null); // Renamed
  const [groundVoiceDescriptionText, setGroundVoiceDescriptionText] = useState<string | null>(null); // Renamed


  useEffect(() => {
    setGroundVoiceLabelText(t('forecastPage.groundVoiceLabel'));
    setSkuLabelText(t('forecastPage.skuLabel'));
    setSelectSkuPlaceholderText(t('forecastPage.selectSkuPlaceholder'));
    setCurrentStockLabelText(t('forecastPage.currentStockLabel'));
    setForecastHorizonLabelText(t('forecastPage.forecastHorizonLabel'));
    setGroundVoicePlaceholderText(t('forecastPage.yourVoiceCountPlaceholder')); // Key from i18n
    setGroundVoiceDescriptionText(t('forecastPage.yourVoiceCountDescription')); // Key from i18n
  }, [t]);

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
        skuName: t(skuDetails.labelKey),
        currentStock: skuDetails.currentStock,
        forecastHorizon: `next ${forecastMonths} months`,
        targetLanguage: language,
        // Add groundVoiceInput to the mutation if your AI flow expects it
        // yourCustomField: groundVoiceInput, 
      });
    }
  };

  const chartData = useMemo(() => {
    if (!salesForecast || !salesForecast.forecastData || salesForecast.forecastData.length === 0) return [];

    const dataForChart = [];
    let previousStock = salesForecast.currentStock;

    dataForChart.push({
      period: t('forecastPage.chart.initialPeriodLabel'),
      sales: 0,
      stock: salesForecast.currentStock,
    });

    for (const dataPoint of salesForecast.forecastData) {
      const salesForPeriod = Math.max(0, previousStock - dataPoint.forecastedStock);
      dataForChart.push({
        period: dataPoint.period,
        sales: salesForPeriod,
        stock: dataPoint.forecastedStock,
      });
      previousStock = dataPoint.forecastedStock;
    }
    return dataForChart;
  }, [salesForecast, t]);

  const chartConfig: ChartConfig = {
    sales: {
      label: t('forecastPage.chart.salesLabel'),
      color: "hsl(var(--chart-1))",
    },
    stock: {
      label: t('forecastPage.chart.stockLabel'),
      color: "hsl(var(--chart-2))",
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
            <Label htmlFor="skuSelect">{skuLabelText !== null ? skuLabelText : translations[language].forecastPage.skuLabel}</Label>
            <Select value={selectedSkuValue} onValueChange={setSelectedSkuValue}>
              <SelectTrigger id="skuSelect" className="w-full text-base">
                <SelectValue placeholder={selectSkuPlaceholderText !== null ? selectSkuPlaceholderText : translations[language].forecastPage.selectSkuPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {mockSkus.map(sku => (
                  <SelectItem key={sku.value} value={sku.value} className="text-base">
                    {t(sku.labelKey)} ({currentStockLabelText !== null ? currentStockLabelText : translations[language].forecastPage.currentStockLabel}: {sku.currentStock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="forecastHorizonSlider">{forecastHorizonLabelText !== null ? forecastHorizonLabelText : translations[language].forecastPage.forecastHorizonLabel}</Label>
            <div className="flex items-center space-x-4 pt-2">
              <Slider
                id="forecastHorizonSlider"
                defaultValue={[forecastMonths]}
                min={3}
                max={12}
                step={1}
                onValueChange={(value) => setForecastMonths(value[0])}
                className="flex-grow"
                aria-label={forecastHorizonLabelText !== null ? forecastHorizonLabelText : translations[language].forecastPage.forecastHorizonLabel}
              />
              <span className="text-base w-32 text-right tabular-nums">
                {t('forecastPage.forecastHorizonValueDisplay', { count: forecastMonths })}
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="groundVoiceTextarea">
              {groundVoiceLabelText !== null ? groundVoiceLabelText : translations[language].forecastPage.groundVoiceLabel}
            </Label>
            <Textarea
              id="groundVoiceTextarea"
              value={groundVoiceInput}
              onChange={(e) => setGroundVoiceInput(e.target.value)}
              placeholder={groundVoicePlaceholderText !== null ? groundVoicePlaceholderText : translations[language].forecastPage.yourVoiceCountPlaceholder}
              className="w-full text-base mt-1 min-h-[80px] resize-y"
              rows={3}
            />
            <p className="text-sm text-muted-foreground mt-1">
              {groundVoiceDescriptionText !== null ? groundVoiceDescriptionText : translations[language].forecastPage.yourVoiceCountDescription}
            </p>
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
              <TrendingUpIcon className="mr-2 h-6 w-6 text-primary" />
              {t('forecastPage.forecastTitle', { skuName: salesForecast.skuName })}
            </CardTitle>
            <CardDescription>
                {t('forecastPage.currentStockValueLabel')}: {salesForecast.currentStock}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <LineChart data={chartData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    label={{ value: t('forecastPage.chart.yAxisUnitsLabel'), angle: -90, position: 'insideLeft', offset: 0, style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' } }}
                  />
                  <RechartsTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-sales)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-sales)"}}
                    activeDot={{ r: 6 }}
                    name={t('forecastPage.chart.salesLabel')}
                  />
                  <Line
                    type="monotone"
                    dataKey="stock"
                    stroke="var(--color-stock)"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "var(--color-stock)"}}
                    activeDot={{ r: 6 }}
                    name={t('forecastPage.chart.stockLabel')}
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
