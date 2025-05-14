
// src/app/(app)/forecast/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { forecastSales, type ForecastSalesOutput, type ForecastSalesInput } from '@/ai/flows/forecast-sales';
import { generateSalesReport, type GenerateSalesReportOutput, type GenerateSalesReportInput } from '@/ai/flows/generate-sales-report-flow'; // New import
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, TrendingUpIcon, PackageSearch, Info, Lightbulb, Download } from 'lucide-react';
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
  const [forecastPeriodMonths, setForecastPeriodMonths] = useState<number>(3);
  const [chatInputValue, setChatInputValue] = useState<string>('');
  const { toast } = useToast();

  const [skuLabelText, setSkuLabelText] = useState<string | null>(null);
  const [selectSkuPlaceholderText, setSelectSkuPlaceholderText] = useState<string | null>(null);
  const [currentStockLabelText, setCurrentStockLabelText] = useState<string | null>(null);
  const [periodLabelText, setPeriodLabelText] = useState<string | null>(null);
  const [sendButtonText, setSendButtonText] = useState<string | null>(null);
  const [processingButtonText, setProcessingButtonText] = useState<string | null>(null);
  const [aiProcessingTitle, setAiProcessingTitle] = useState<string | null>(null);
  const [aiProcessingDescription, setAiProcessingDescription] = useState<string | null>(null);
  const [chatPlaceholderText, setChatPlaceholderText] = useState<string | null>(null);

  useEffect(() => {
    setSkuLabelText(t('forecastPage.skuLabel'));
    setSelectSkuPlaceholderText(t('forecastPage.selectSkuPlaceholder'));
    setCurrentStockLabelText(t('forecastPage.currentStockLabel'));
    setPeriodLabelText(t('forecastPage.periodLabel'));
    setSendButtonText(t('forecastPage.sendButton'));
    setProcessingButtonText(t('forecastPage.processingButton'));
    setAiProcessingTitle(t('forecastPage.aiProcessing.title'));
    setAiProcessingDescription(t('forecastPage.aiProcessing.description'));
    setChatPlaceholderText(t('forecastPage.chatInputPlaceholder'));
  }, [t]);

  const forecastMutation = useMutation<ForecastSalesOutput, Error, ForecastSalesInput>({
    mutationFn: forecastSales,
    onSuccess: (data) => {
      toast({
        title: t('forecastPage.toast.forecastSuccessTitle'),
        description: t('forecastPage.toast.forecastSuccessDescription', { skuName: data.skuName }),
      });
    },
    onError: (err) => {
      toast({
        title: t('forecastPage.toast.forecastErrorTitle'),
        description: err.message || t('forecastPage.toast.forecastErrorDescription'),
        variant: 'destructive',
      });
    },
  });

  const reportMutation = useMutation<GenerateSalesReportOutput, Error, GenerateSalesReportInput>({
    mutationFn: generateSalesReport,
    onSuccess: (data) => {
      if (data.csvData && data.fileName) {
        const blob = new Blob([data.csvData], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', data.fileName);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        toast({
          title: t('forecastPage.toast.reportSuccessTitle'),
          description: t('forecastPage.toast.reportSuccessDescription', { fileName: data.fileName }),
        });
      } else {
        toast({
          title: t('forecastPage.toast.reportErrorTitle'),
          description: t('forecastPage.toast.reportErrorNoData'),
          variant: 'destructive',
        });
      }
    },
    onError: (err) => {
      toast({
        title: t('forecastPage.toast.reportErrorTitle'),
        description: err.message || t('forecastPage.toast.reportErrorDescription'),
        variant: 'destructive',
      });
    },
  });

  const handleSendMessage = () => {
    const lowerCaseInput = chatInputValue.toLowerCase();

    if (lowerCaseInput.includes('help me to forecast')) {
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
        // Remove the command phrase from the user prompt if desired
        const userPromptForForecast = chatInputValue.replace(/help me to forecast/gi, '').trim();
        forecastMutation.mutate({
          skuName: t(skuDetails.labelKey),
          currentStock: skuDetails.currentStock,
          forecastHorizon: `next ${forecastPeriodMonths} months`,
          targetLanguage: language,
          userPrompt: userPromptForForecast,
        });
      }
    } else if (lowerCaseInput.includes('help me to generate reports') || lowerCaseInput.includes('help me to generate report')) {
      reportMutation.mutate({
        // Add any necessary input for report generation, e.g., date range
        // For now, it takes no specific input beyond triggering the flow.
        // reportType: 'sales_summary', 
        // targetLanguage: language // If report content needs localization
      });
    } else {
      toast({
        title: t('forecastPage.toast.actionNotRecognizedTitle'),
        description: t('forecastPage.toast.actionNotRecognizedDescription'),
        variant: 'default',
      });
    }
  };
  
  const isProcessing = forecastMutation.isPending || reportMutation.isPending;

  const chartData = useMemo(() => {
    if (!forecastMutation.data || !forecastMutation.data.forecastData || forecastMutation.data.forecastData.length === 0) return [];

    const dataForChart = [];
    let previousStock = forecastMutation.data.currentStock;

    dataForChart.push({
      period: t('forecastPage.chart.initialPeriodLabel'),
      sales: 0,
      stock: forecastMutation.data.currentStock,
    });

    for (const dataPoint of forecastMutation.data.forecastData) {
      const salesForPeriod = Math.max(0, previousStock - dataPoint.forecastedStock);
      dataForChart.push({
        period: dataPoint.period,
        sales: salesForPeriod,
        stock: dataPoint.forecastedStock,
      });
      previousStock = dataPoint.forecastedStock;
    }
    return dataForChart;
  }, [forecastMutation.data, t]);

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
            <Label htmlFor="skuSelect">{skuLabelText ?? translations[language].forecastPage.skuLabel}</Label>
            <Select value={selectedSkuValue} onValueChange={setSelectedSkuValue} disabled={isProcessing}>
              <SelectTrigger id="skuSelect" className="w-full text-base">
                <SelectValue placeholder={selectSkuPlaceholderText ?? translations[language].forecastPage.selectSkuPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {mockSkus.map(sku => (
                  <SelectItem key={sku.value} value={sku.value} className="text-base">
                    {t(sku.labelKey)} ({currentStockLabelText ?? translations[language].forecastPage.currentStockLabel}: {sku.currentStock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="periodSlider">{periodLabelText ?? translations[language].forecastPage.periodLabel}</Label>
            <div className="flex items-center space-x-4 pt-2">
              <Slider
                id="periodSlider"
                defaultValue={[forecastPeriodMonths]}
                min={3}
                max={12}
                step={1}
                onValueChange={(value) => setForecastPeriodMonths(value[0])}
                className="flex-grow"
                aria-label={periodLabelText ?? translations[language].forecastPage.periodLabel}
                disabled={isProcessing}
              />
              <span className="text-base w-32 text-right tabular-nums">
                {t('forecastPage.forecastHorizonValueDisplay', { count: forecastPeriodMonths })}
              </span>
            </div>
          </div>
          <div>
            <Textarea
              id="chatInput"
              value={chatInputValue}
              onChange={(e) => setChatInputValue(e.target.value)}
              placeholder={chatPlaceholderText ?? translations[language].forecastPage.chatInputPlaceholder}
              className="mt-1 h-24 resize-none"
              disabled={isProcessing}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSendMessage} disabled={isProcessing || !chatInputValue.trim()} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {processingButtonText ?? translations[language].forecastPage.processingButton}
              </>
            ) : (
              sendButtonText ?? translations[language].forecastPage.sendButton
            )}
          </Button>
        </CardFooter>
      </Card>

      {isProcessing && !forecastMutation.data && !reportMutation.data && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Loader2 className="mr-3 h-6 w-6 text-primary animate-spin" />
              {aiProcessingTitle ?? translations[language].forecastPage.aiProcessing.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">
              {aiProcessingDescription ?? translations[language].forecastPage.aiProcessing.description}
            </p>
          </CardContent>
        </Card>
      )}

      {forecastMutation.error && (
        <Alert variant="destructive">
          <AlertTitle>{t('forecastPage.errorAlertTitle')}</AlertTitle>
          <AlertDescription>{forecastMutation.error.message}</AlertDescription>
        </Alert>
      )}
      {reportMutation.error && (
         <Alert variant="destructive">
          <AlertTitle>{t('forecastPage.toast.reportErrorTitle')}</AlertTitle>
          <AlertDescription>{reportMutation.error.message}</AlertDescription>
        </Alert>
      )}

      {forecastMutation.data && !forecastMutation.isPending && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUpIcon className="mr-2 h-6 w-6 text-primary" />
              {t('forecastPage.forecastTitle', { skuName: forecastMutation.data.skuName })}
            </CardTitle>
            <CardDescription>
                {t('forecastPage.currentStockValueLabel')}: {forecastMutation.data.currentStock}
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
              <p className="text-base whitespace-pre-wrap">{forecastMutation.data.reasoning}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-muted-foreground" />{t('forecastPage.recommendationsTitle')}</h3>
              <p className="text-base whitespace-pre-wrap">{forecastMutation.data.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
