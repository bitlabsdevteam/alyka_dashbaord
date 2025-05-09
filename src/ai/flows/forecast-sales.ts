// forecast-sales.ts
'use server';

/**
 * @fileOverview AI-driven sales forecasting based on trend analysis.
 *
 * - forecastSales - A function to generate sales forecasts based on trend analysis.
 * - ForecastSalesInput - The input type for the forecastSales function.
 * - ForecastSalesOutput - The return type for the forecastSales function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastSalesInputSchema = z.object({
  trendAnalysisReport: z
    .string()
    .describe('Trend analysis report including silhouette, color, pattern, fabric, seasonal relevance, and consumer sentiment.'),
  pastSalesData: z
    .string()
    .describe('Historical sales data to provide context for the forecast.'),
  marketConditions: z.string().describe('Current market conditions affecting sales.'),
});
export type ForecastSalesInput = z.infer<typeof ForecastSalesInputSchema>;

const ForecastSalesOutputSchema = z.object({
  overallForecast: z.string().describe('Overall sales forecast summary.'),
  detailedForecast: z.record(z.string(), z.string()).describe('Detailed sales forecasts for specific product categories or segments.'),
  reasoning: z.string().describe('Clear reasoning behind the forecast, considering trend relevance and market factors.'),
  recommendations: z.string().describe('Recommendations for actions based on the forecast.'),
});
export type ForecastSalesOutput = z.infer<typeof ForecastSalesOutputSchema>;

export async function forecastSales(input: ForecastSalesInput): Promise<ForecastSalesOutput> {
  return forecastSalesFlow(input);
}

const forecastSalesPrompt = ai.definePrompt({
  name: 'forecastSalesPrompt',
  input: {schema: ForecastSalesInputSchema},
  output: {schema: ForecastSalesOutputSchema},
  prompt: `You are an AI assistant designed to provide sales forecasts based on trend analysis.

  Analyze the following trend analysis report, past sales data, and market conditions to generate a sales forecast.

  Trend Analysis Report: {{{trendAnalysisReport}}}
  Past Sales Data: {{{pastSalesData}}}
  Market Conditions: {{{marketConditions}}}

  Provide a summary of the overall forecast, detailed forecasts for different product categories or segments, clear reasoning behind the forecast, and recommendations for actions.

  Format your response as a JSON object conforming to the ForecastSalesOutputSchema. Make sure the "reasoning" field explains how each trend relates to the forecast and how the AI decided on its relevance, in order to provide a decision support tool.
  `,
});

const forecastSalesFlow = ai.defineFlow(
  {
    name: 'forecastSalesFlow',
    inputSchema: ForecastSalesInputSchema,
    outputSchema: ForecastSalesOutputSchema,
  },
  async input => {
    const {output} = await forecastSalesPrompt(input);
    return output!;
  }
);
