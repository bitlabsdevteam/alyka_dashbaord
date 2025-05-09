'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, Line, BarChart, Bar } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ShoppingCart, DollarSign, TrendingDown } from 'lucide-react';

const mockMonthlySalesData = [
  { month: 'Jan', sales: 4000, units: 240 },
  { month: 'Feb', sales: 3000, units: 190 },
  { month: 'Mar', sales: 5000, units: 280 },
  { month: 'Apr', sales: 4500, units: 260 },
  { month: 'May', sales: 6000, units: 310 },
  { month: 'Jun', sales: 5500, units: 300 },
];

const mockCategorySalesData = [
  { category: 'Outerwear', sales: 12000 },
  { category: 'Tops', sales: 9000 },
  { category: 'Bottoms', sales: 7500 },
  { category: 'Dresses', sales: 6000 },
  { category: 'Accessories', sales: 4500 },
];

const chartConfigSales = {
  sales: {
    label: "Sales ($)",
    color: "hsl(var(--primary))",
  },
  units: {
    label: "Units Sold",
    color: "hsl(var(--accent))",
  },
};

const chartConfigCategory = {
  sales: {
    label: "Sales ($)",
    color: "hsl(var(--chart-2))",
  },
};


export default function PosSalesPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
            POS Sales Data Overview
          </CardTitle>
          <CardDescription>
            Visualize your Point of Sale data to understand performance and identify trends.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units Sold</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$87.50</div>
            <p className="text-xs text-muted-foreground">-2.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigSales} className="h-[350px] w-full">
            <LineChart data={mockMonthlySalesData} accessibilityLayer>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
              <RechartsTooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} dot={{ fill: "var(--color-sales)" }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" dataKey="units" stroke="var(--color-units)" strokeWidth={2} dot={{ fill: "var(--color-units)" }} activeDot={{ r: 6 }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigCategory} className="h-[350px] w-full">
            <BarChart data={mockCategorySalesData} accessibilityLayer layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} tickMargin={8} width={100} />
              <RechartsTooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="sales" fill="var(--color-sales)" radius={4} layout="vertical" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
