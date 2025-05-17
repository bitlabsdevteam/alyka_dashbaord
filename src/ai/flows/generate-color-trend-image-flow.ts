
'use server';
/**
 * @fileOverview Generates an image for a color trend using AI.
 *
 * - generateColorTrendImage - A function that generates an image based on a color name and description.
 * - GenerateColorTrendImageInput - The input type for the generateColorTrendImage function.
 * - GenerateColorTrendImageOutput - The return type for the generateColorTrendImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateColorTrendImageInputSchema = z.object({
  colorName: z.string().describe('The name of the color trend (e.g., "Deep Sapphire").'),
  colorDescription: z.string().describe('A brief description of the color trend and its typical application in B2B apparel (e.g., "luxurious, elegant, evening wear, statement pieces").'),
});
export type GenerateColorTrendImageInput = z.infer<typeof GenerateColorTrendImageInputSchema>;

const GenerateColorTrendImageOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI. Expected format: 'data:image/png;base64,<encoded_data>'."),
  revisedPrompt: z.string().optional().describe('The prompt used by the AI if it was revised.'),
});
export type GenerateColorTrendImageOutput = z.infer<typeof GenerateColorTrendImageOutputSchema>;

export async function generateColorTrendImage(input: GenerateColorTrendImageInput): Promise<GenerateColorTrendImageOutput> {
  return generateColorTrendImageFlow(input);
}

const generateColorTrendImageFlow = ai.defineFlow(
  {
    name: 'generateColorTrendImageFlow',
    inputSchema: GenerateColorTrendImageInputSchema,
    outputSchema: GenerateColorTrendImageOutputSchema,
  },
  async (input: GenerateColorTrendImageInput) => {
    const promptText = `Generate an image representing the B2B apparel color trend: '${input.colorName}'. 
    The style should be suitable for a fashion trend presentation. 
    Consider its characteristics: ${input.colorDescription}. 
    Showcase apparel items or fabric textures that embody this color trend. 
    Focus on a clean, modern aesthetic.`;

    try {
      const {media, text} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp',
        prompt: promptText,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
           safetySettings: [ // Add safety settings to reduce potential for blocking
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        },
      });

      if (media && media.url) {
        return { imageDataUri: media.url, revisedPrompt: text() };
      } else {
        console.error('Image generation did not return media.url. Text response:', text());
        throw new Error('AI image generation failed to produce an image URL.');
      }
    } catch (error) {
      console.error('Error in generateColorTrendImageFlow:', error);
      throw new Error(`Failed to generate image for ${input.colorName}.`);
    }
  }
);
