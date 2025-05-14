
'use server';
/**
 * @fileOverview Generates a sales report as CSV data.
 *
 * - generateSalesReport - A function that compiles sales data into a CSV string.
 * - GenerateSalesReportInput - The input type for the generateSalesReport function.
 * - GenerateSalesReportOutput - The return type for the generateSalesReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { format, subMonths, startOfMonth } from 'date-fns'; // For mock data generation

// Define mock data structure (similar to POS sales page)
interface ReportablePosEntry {
  monthYear: string;
  productName: string; // Using direct English names for CSV simplicity
  category: string;    // Using direct English names
  sku: string;
  unitsSold: number;
  revenue: number;
  storeLocation: string;
  posName: 'Smartregi';
}

const productNames = [
    "Men's Wool Overcoat", "Women's Silk Blouse", "Unisex Denim Jeans", 
    "Floral Summer Dress", "Leather Shoulder Bag", "Limited Edition Sneakers"
];
const productCategories = {
    "Men's Wool Overcoat": 'Outerwear',
    "Women's Silk Blouse": 'Tops',
    "Unisex Denim Jeans": 'Bottoms',
    "Floral Summer Dress": 'Dresses',
    "Leather Shoulder Bag": 'Accessories',
    "Limited Edition Sneakers": 'Footwear',
};
const productSkus = {
    "Men's Wool Overcoat": 'SKUWC001',
    "Women's Silk Blouse": 'SKUSB002',
    "Unisex Denim Jeans": 'SKUDJ003',
    "Floral Summer Dress": 'SKUSD004',
    "Leather Shoulder Bag": 'SKULB005',
    "Limited Edition Sneakers": 'SKUFS006',
};
const storeLocations = ['Tokyo', 'Osaka', 'Hiroshima'];


const generateMockReportData = (): ReportablePosEntry[] => {
  const data: ReportablePosEntry[] = [];
  let idCounter = 1;
  const endDate = startOfMonth(new Date(2025, 4, 1)); // May 2025
  let currentDate = startOfMonth(new Date(2023, 0, 1)); // Jan 2023

  while (currentDate <= endDate) {
    for (const productName of productNames) {
      const unitsSold = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
      const pricePerUnit = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      const revenue = unitsSold * pricePerUnit;
      const randomStoreLocation = storeLocations[Math.floor(Math.random() * storeLocations.length)];
      
      data.push({
        monthYear: format(currentDate, 'MMM yyyy'),
        productName,
        category: productCategories[productName as keyof typeof productCategories],
        sku: productSkus[productName as keyof typeof productSkus],
        unitsSold: unitsSold,
        revenue: revenue,
        storeLocation: randomStoreLocation,
        posName: 'Smartregi',
      });
    }
    currentDate = startOfMonth(subMonths(currentDate, -1));
  }
  return data;
};


const GenerateSalesReportInputSchema = z.object({
  // Placeholder for future input, e.g., date range, specific SKUs
  // reportType: z.string().optional().describe("Type of report, e.g., 'sales_summary', 'detailed_transactions'"),
  // targetLanguage: z.enum(['en', 'ja']).optional().describe('Language for report headers if applicable'),
});
export type GenerateSalesReportInput = z.infer<typeof GenerateSalesReportInputSchema>;

const GenerateSalesReportOutputSchema = z.object({
  csvData: z.string().describe('The sales report data formatted as a CSV string.'),
  fileName: z.string().describe('Suggested filename for the downloaded report (e.g., sales_report_YYYY-MM-DD.csv).'),
});
export type GenerateSalesReportOutput = z.infer<typeof GenerateSalesReportOutputSchema>;

export async function generateSalesReport(input: GenerateSalesReportInput): Promise<GenerateSalesReportOutput> {
  return generateSalesReportFlow(input);
}

// This flow doesn't use an LLM prompt directly to generate the CSV.
// It uses TypeScript logic to format data.
// An LLM could be used to decide *what* data goes into the report or to summarize it,
// but the CSV generation itself is programmatic.

const generateSalesReportFlow = ai.defineFlow(
  {
    name: 'generateSalesReportFlow',
    inputSchema: GenerateSalesReportInputSchema,
    outputSchema: GenerateSalesReportOutputSchema,
  },
  async (input: GenerateSalesReportInput): Promise<GenerateSalesReportOutput> => {
    const salesData = generateMockReportData(); // Using mock data generator

    if (!salesData || salesData.length === 0) {
      return { csvData: '', fileName: `empty_sales_report_${new Date().toISOString().split('T')[0]}.csv` };
    }

    // Define CSV headers
    const headers = [
      'Month/Year',
      'Product Name',
      'Category',
      'SKU',
      'Units Sold',
      'Revenue',
      'Store Location',
      'POS Name'
    ];
    
    // Convert data to CSV rows
    const csvRows = salesData.map(item => [
      item.monthYear,
      `"${item.productName.replace(/"/g, '""')}"`, // Escape double quotes
      `"${item.category.replace(/"/g, '""')}"`,
      item.sku,
      item.unitsSold,
      item.revenue,
      item.storeLocation,
      item.posName
    ].join(','));

    const csvString = [headers.join(','), ...csvRows].join('\n');
    
    const fileName = `sales_report_${new Date().toISOString().split('T')[0]}.csv`;

    return {
      csvData: csvString,
      fileName: fileName,
    };
  }
);
