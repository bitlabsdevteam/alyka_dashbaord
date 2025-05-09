'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateTrendReport, type GenerateTrendReportOutput } from '@/ai/flows/generate-trend-report';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, BarChart2, Palette, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Bar, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const mockSilhouetteData = [
  { name: 'Oversized Blazers', value: 75 },
  { name: 'Wide-Leg Trousers', value: 80 },
  { name: 'Bodycon Dresses', value: 40 },
  { name: 'Utility Jumpsuits', value: 60 },
  { name: 'Cropped Tops', value: 55 },
];

const mockColorData = [
  { name: 'Cerulean Blue', value: 400 },
  { name: 'Dusty Rose', value: 300 },
  { name: 'Olive Green', value: 200 },
  { name: 'Mustard Yellow', value: 150 },
  { name: 'Lavender', value: 250 },
];
const COLORS = ['#2E9AFE', '#FF8042', '#00C49F', '#FFBB28', '#A42EFF'];


const chartConfigSilhouette = {
  value: {
    label: "Popularity",
    color: "hsl(var(--primary))",
  },
};

const chartConfigColor = {
  value: {
    label: "Popularity",
  },
  ...mockColorData.reduce((acc, item, index) => {
    acc[item.name] = { label: item.name, color: COLORS[index % COLORS.length] };
    return acc;
  }, {} as any)
};


export default function AnalyticsPage() {
  const [prompt, setPrompt] = useState<string>('Analyze current B2B womenswear trends for Fall/Winter 2024, focusing on sustainable fabrics and minimalist aesthetics.');
  const { toast } = useToast();

  const { mutate, data: trendReport, isPending, error } = useMutation<GenerateTrendReportOutput, Error, string>({
    mutationFn: async (currentPrompt: string) => generateTrendReport({ prompt: currentPrompt }),
    onSuccess: () => {
      toast({
        title: 'Trend Report Generated',
        description: 'The AI has successfully analyzed the trends.',
      });
    },
    onError: (err) => {
      toast({
        title: 'Error Generating Report',
        description: err.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: 'Prompt is empty',
        description: 'Please enter a prompt for trend analysis.',
        variant: 'destructive',
      });
      return;
    }
    mutate(prompt);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Lightbulb className="mr-2 h-6 w-6 text-primary" />
            Trend Analysis Input
          </CardTitle>
          <CardDescription>
            Enter your prompt below to generate an AI-powered B2B apparel market trend report.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="prompt">Analysis Prompt</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., Analyze Spring/Summer 2025 menswear focusing on streetwear influences and recycled materials."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="text-base"
              />
              <p className="text-sm text-muted-foreground">
                Provide detailed context for the best results. Include target market, season, specific interests (e.g., sustainability, color palettes).
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Trend Report'
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

      {trendReport && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Sparkles className="mr-2 h-6 w-6 text-primary" />
              AI Generated Trend Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none text-base whitespace-pre-wrap">
              {trendReport.report}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-primary" />
              Silhouette Popularity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigSilhouette} className="h-[300px] w-full">
              <BarChart data={mockSilhouetteData} accessibilityLayer>
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <RechartsTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-primary" />
              Color Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigColor} className="h-[300px] w-full">
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
