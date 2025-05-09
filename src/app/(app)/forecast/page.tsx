'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { forecastSales, type ForecastSalesOutput, type ForecastSalesInput } from '@/ai/flows/forecast-sales';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, TrendingUpIcon, FileText, ShoppingBag, BarChartBig } from 'lucide-react';

export default function ForecastPage() {
  const [formData, setFormData] = useState<ForecastSalesInput>({
    trendAnalysisReport: '',
    pastSalesData: '',
    marketConditions: '',
  });
  const { toast } = useToast();

  const { mutate, data: salesForecast, isPending, error } = useMutation<ForecastSalesOutput, Error, ForecastSalesInput>({
    mutationFn: forecastSales,
    onSuccess: () => {
      toast({
        title: 'Sales Forecast Generated',
        description: 'The AI has successfully generated the sales forecast.',
      });
    },
    onError: (err) => {
      toast({
        title: 'Error Generating Forecast',
        description: err.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.trendAnalysisReport.trim() || !formData.pastSalesData.trim() || !formData.marketConditions.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields for an accurate forecast.',
        variant: 'destructive',
      });
      return;
    }
    mutate(formData);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <TrendingUpIcon className="mr-2 h-6 w-6 text-primary" />
            Sales Forecast Input
          </CardTitle>
          <CardDescription>
            Provide the necessary data to generate an AI-powered sales forecast.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="trendAnalysisReport">Trend Analysis Report</Label>
              <Textarea
                id="trendAnalysisReport"
                placeholder="Paste the generated trend analysis report here..."
                value={formData.trendAnalysisReport}
                onChange={handleChange}
                rows={6}
                className="text-base"
              />
            </div>
            <div>
              <Label htmlFor="pastSalesData">Past Sales Data (Summary or Key Points)</Label>
              <Textarea
                id="pastSalesData"
                placeholder="e.g., Q4 2023: 5000 units of outerwear sold, popular items were trench coats and puffer jackets. Revenue: $250,000."
                value={formData.pastSalesData}
                onChange={handleChange}
                rows={4}
                className="text-base"
              />
            </div>
            <div>
              <Label htmlFor="marketConditions">Current Market Conditions</Label>
              <Input
                id="marketConditions"
                placeholder="e.g., Stable economy, increased online shopping, competitor X launched new line."
                value={formData.marketConditions}
                onChange={handleChange}
                className="text-base"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Forecast...
                </>
              ) : (
                'Generate Sales Forecast'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      {salesForecast && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
               <BarChartBig className="mr-2 h-6 w-6 text-primary" />
              AI Generated Sales Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg flex items-center"><FileText className="mr-2 h-5 w-5 text-muted-foreground" />Overall Forecast</h3>
              <p className="text-base whitespace-pre-wrap">{salesForecast.overallForecast}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg flex items-center"><ShoppingBag className="mr-2 h-5 w-5 text-muted-foreground" />Detailed Forecast</h3>
              <ul className="list-disc pl-5 space-y-1 text-base">
                {Object.entries(salesForecast.detailedForecast).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Reasoning</h3>
              <p className="text-base whitespace-pre-wrap">{salesForecast.reasoning}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Recommendations</h3>
              <p className="text-base whitespace-pre-wrap">{salesForecast.recommendations}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
