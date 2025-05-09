'use server';

/**
 * @fileOverview Generates a trend report based on a given prompt.
 *
 * - generateTrendReport - A function that generates a trend report.
 * - GenerateTrendReportInput - The input type for the generateTrendReport function.
 * - GenerateTrendReportOutput - The return type for the generateTrendReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTrendReportInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate the trend report from.'),
});
export type GenerateTrendReportInput = z.infer<typeof GenerateTrendReportInputSchema>;

const GenerateTrendReportOutputSchema = z.object({
  report: z.string().describe('The generated trend report.'),
});
export type GenerateTrendReportOutput = z.infer<typeof GenerateTrendReportOutputSchema>;

export async function generateTrendReport(input: GenerateTrendReportInput): Promise<GenerateTrendReportOutput> {
  return generateTrendReportFlow(input);
}

const generateTrendReportPrompt = ai.definePrompt({
  name: 'generateTrendReportPrompt',
  input: {schema: GenerateTrendReportInputSchema},
  output: {schema: GenerateTrendReportOutputSchema},
  prompt: `You are an AI trend analyst specializing in B2B apparel market trends.
  Generate a trend report based on the following prompt: {{{prompt}}}. The report should include insights into silhouette, color, pattern, fabric, seasonal relevance, and consumer sentiment.
  Focus on actionable insights that the user can use to make informed business decisions.`,
});

const generateTrendReportFlow = ai.defineFlow(
  {
    name: 'generateTrendReportFlow',
    inputSchema: GenerateTrendReportInputSchema,
    outputSchema: GenerateTrendReportOutputSchema,
  },
  async input => {
    const {output} = await generateTrendReportPrompt(input);
    return output!;
  }
);
