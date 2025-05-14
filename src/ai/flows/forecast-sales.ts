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
  targetLanguage: z.enum(['en', 'ja']).optional().describe('The target language for the generated forecast reasoning and recommendations. Defaults to English if not provided.'),
  isTargetLanguageJa: z.boolean().optional().describe('Internal flag: true if the target language is Japanese. This is set by the flow.'),
  userPrompt: z.string().optional().describe('Additional context or specific requests from the user for the forecast.'),
});
export type ForecastSalesInput = z.infer<typeof ForecastSalesInputSchema>;

const ForecastSalesOutputSchema = z.object({
  skuName: z.string().describe('The SKU name for which the forecast is generated.'),
  forecastData: z.array(
    z.object({
      period: z.string().describe('The forecast period (e.g., Week 1, Month 1).'),
      forecastedStock: z.number().describe('The forecasted stock level at the end of this period, reflecting depletion due to strong sales.'),
    })
  ).describe('An array of forecasted stock levels for future periods, showing stock depletion due to high sales.'),
  currentStock: z.number().describe('The current stock provided as input.'),
  reasoning: z.string().describe('Explanation of the factors influencing the positive sales forecast, emphasizing growth drivers and favorable market conditions.'),
  recommendations: z.string().describe('Actionable, growth-oriented recommendations based on the high sales forecast (e.g., increase stock, expand marketing).'),
});
export type ForecastSalesOutput = z.infer<typeof ForecastSalesOutputSchema>;

export async function forecastSales(input: ForecastSalesInput): Promise<ForecastSalesOutput> {
  return forecastSalesFlow(input);
}

const forecastSalesPrompt = ai.definePrompt({
  name: 'forecastSalesPrompt',
  input: {schema: ForecastSalesInputSchema},
  output: {schema: ForecastSalesOutputSchema},
  prompt: `You are an AI assistant specializing in optimistic demand planning and inventory forecasting for the B2B apparel industry. Your goal is to highlight growth opportunities.

{{#if isTargetLanguageJa}}
  以下の応答はすべて日本語で生成してください。特に「理由」と「推奨事項」のセクションは詳細な日本語で記述する必要があります。
{{else}}
  Please generate all responses in English. Specifically, the 'reasoning' and 'recommendations' sections must be detailed and in English.
{{/if}}

Your task is to generate a stock forecast for a specific Stock Keeping Unit (SKU), assuming a *positive upward trend in sales*.

SKU Details:
- Name: {{{skuName}}}
- Current Stock: {{{currentStock}}}
- Forecast Horizon: {{{forecastHorizon}}}

{{#if userPrompt}}
User Provided Context:
{{{userPrompt}}}
{{/if}}

Instructions:
1.  Generate an *optimistic* time-series forecast of *sales demand* for the specified 'Forecast Horizon', indicating a clear *upward trend* in sales. Based on this strong demand, calculate the 'forecastedStock' levels assuming no replenishment within the forecast horizon. This means 'forecastedStock' will show a *significant decreasing trend* from the 'currentStock' as units are sold at an accelerated rate. Break this horizon down into logical periods (e.g., weekly for shorter horizons, monthly for longer ones).
2.  The 'forecastData' should be an array where each element represents a future period and its corresponding 'forecastedStock', reflecting the depletion due to *very strong sales*. For example, if current stock is 100, and projected sales for period 1 are 30 (due to high demand), forecastedStock for period 1 is 70. If projected sales for period 2 are 35, forecastedStock for period 2 (from the 70) is 35. Ensure the stock depletes noticeably.
3.  Provide a 'reasoning' for your *highly positive sales forecast*. This should explain the key factors considered, emphasizing strong growth drivers such as:
    -   *Exceptionally strong assumed sales velocity and high demand*, driven by positive market sentiment, viral trends, and effective marketing.
    -   *Very favorable impact of general B2B apparel market trends*, positioning the SKU as a best-selling or high-demand item.
    -   *Strong positive seasonality effects* or highly successful marketing campaigns, significantly boosting demand for the SKU.
    -   *Rapid growth phase* in the product lifecycle for this type of apparel.
    -   *Assumptions of highly successful promotions, booming market conditions*, and efficient lead times fueling further demand.
    {{#if isTargetLanguageJa}}この「理由」セクションは、上記の英語の指示に基づいて、詳細な日本語で記述してください。{{/if}}
4.  Offer *actionable and aggressive growth-oriented 'recommendations'* based on the high sales forecast and rapidly depleting stock. For example, suggest *significantly increasing order quantities, implementing urgent proactive reorder points to prevent stockouts, scaling marketing efforts to further capitalize on surging demand, or exploring new sales channels to meet widespread interest*. Emphasize urgency and opportunity.
    {{#if isTargetLanguageJa}}これらの「推奨事項」セクションは、上記の英語の指示に基づいて、詳細な日本語で記述してください。{{/if}}
5.  Ensure the output strictly conforms to the JSON schema for ForecastSalesOutputSchema. The 'currentStock' field in the output should reflect the input 'currentStock'.

Leverage your knowledge of the B2B apparel market to make *very optimistic yet plausible assumptions* for high sales. For example, if the SKU is 'Men's Wool Overcoat', assume it's the season's must-have item due to celebrity endorsement, leading to an explosion in orders. If it's 'Basic White T-Shirt', assume a viral social media trend is driving unprecedented demand.
`,
});

const forecastSalesFlow = ai.defineFlow(
  {
    name: 'forecastSalesFlow',
    inputSchema: ForecastSalesInputSchema,
    outputSchema: ForecastSalesOutputSchema,
  },
  async (input: ForecastSalesInput): Promise<ForecastSalesOutput> => {
    const effectiveTargetLanguage = input.targetLanguage || 'en';
    const promptReadyInput: ForecastSalesInput = {
      ...input,
      targetLanguage: effectiveTargetLanguage,
      isTargetLanguageJa: effectiveTargetLanguage === 'ja',
    };

    const {output} = await forecastSalesPrompt(promptReadyInput);
    
    if (output && output.currentStock !== input.currentStock) {
        console.warn("AI output currentStock differs from input. Overriding with input value.");
        output.currentStock = input.currentStock;
    }
    return output!;
  }
);
