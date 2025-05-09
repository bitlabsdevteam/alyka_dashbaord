// forecast-sales.ts
'use server';

/**
 * @fileOverview AI-driven sales forecasting for specific SKUs.
 *
 * - forecastSales - A function to generate stock forecasts for a given SKU.
 * - ForecastSalesInput - The input type for the forecastSales function.
 * - ForecastSalesOutput - The return type for the forecastSales function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ForecastSalesInputSchema = z.object({
  skuName: z.string().describe('The name or identifier of the Stock Keeping Unit (SKU) for the apparel item.'),
  currentStock: z.number().describe('The current stock level of the SKU.'),
  forecastHorizon: z.string().describe("The desired forecast horizon, e.g., 'next 4 weeks', 'next 3 months'. Default to 'next 3 months' if not specified."),
  // Optionally, we could add historical data for the SKU if available
  // historicalSales: z.array(z.object({ period: z.string(), unitsSold: z.number() })).optional().describe('Historical sales data for this specific SKU.')
});
export type ForecastSalesInput = z.infer<typeof ForecastSalesInputSchema>;

const ForecastSalesOutputSchema = z.object({
  skuName: z.string().describe('The SKU name for which the forecast is generated.'),
  forecastData: z.array(
    z.object({
      period: z.string().describe('The forecast period (e.g., Week 1, Month 1).'),
      forecastedStock: z.number().describe('The forecasted stock level at the end of this period.'),
    })
  ).describe('An array of forecasted stock levels for future periods.'),
  currentStock: z.number().describe('The current stock provided as input.'),
  reasoning: z.string().describe('Explanation of the factors influencing the forecast, including how general apparel trends, seasonality, and SKU-specific characteristics were considered.'),
  recommendations: z.string().describe('Actionable recommendations based on the forecast (e.g., reorder points, promotional strategies).'),
});
export type ForecastSalesOutput = z.infer<typeof ForecastSalesOutputSchema>;

export async function forecastSales(input: ForecastSalesInput): Promise<ForecastSalesOutput> {
  return forecastSalesFlow(input);
}

const forecastSalesPrompt = ai.definePrompt({
  name: 'forecastSalesPrompt',
  input: {schema: ForecastSalesInputSchema},
  output: {schema: ForecastSalesOutputSchema},
  prompt: `You are an AI assistant specializing in demand planning and inventory forecasting for the B2B apparel industry.

Your task is to generate a stock forecast for a specific Stock Keeping Unit (SKU).

SKU Details:
- Name: {{{skuName}}}
- Current Stock: {{{currentStock}}}
- Forecast Horizon: {{{forecastHorizon}}}

Instructions:
1.  Generate a time-series forecast of stock levels for the specified 'Forecast Horizon'. Break this horizon down into logical periods (e.g., weekly for shorter horizons, monthly for longer ones).
2.  The 'forecastData' should be an array where each element represents a future period and its corresponding 'forecastedStock'.
3.  Provide a 'reasoning' for your forecast. This should explain the key factors considered, such as:
    -   Assumed sales velocity or demand.
    -   Impact of general B2B apparel market trends (e.g., if it's a trending item or a basic staple).
    -   Seasonality relevant to the SKU (e.g., higher demand for coats in winter).
    -   Typical product lifecycle considerations for this type of apparel.
    -   Any assumptions made about promotions, market conditions, or lead times if not explicitly provided.
4.  Offer actionable 'recommendations' based on your forecast. For example, suggest reorder points, optimal stock levels, or promotional strategies to manage inventory.
5.  Ensure the output strictly conforms to the JSON schema for ForecastSalesOutputSchema. The 'currentStock' field in the output should reflect the input 'currentStock'.

Leverage your knowledge of the B2B apparel market to make informed assumptions where necessary. For example, if the SKU is 'Men's Wool Overcoat', expect higher demand in colder months. If it's 'Basic White T-Shirt', demand might be more stable but influenced by bulk order cycles.
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
    // Ensure the output currentStock matches the input currentStock, as per prompt instructions.
    if (output && output.currentStock !== input.currentStock) {
        // This is a safeguard, the prompt should handle it.
        console.warn("AI output currentStock differs from input. Overriding with input value.");
        output.currentStock = input.currentStock;
    }
    return output!;
  }
);
