// analytics/page.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Newspaper, TrendingUp, Layers } from 'lucide-react'; 
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, CartesianGrid, Line } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useLanguage } from '@/context/language-context';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Component for rendering images with a fallback to picsum.photos
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  aiHint?: string;
  priority?: boolean;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, aiHint, priority = false }) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setCurrentSrc(src); // Reset src if the prop changes
    setIsLoading(true);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      onError={() => {
        setIsLoading(false);
        // Create a unique seed for picsum based on alt text to get different images
        const seed = alt.replace(/\s+/g, '-').toLowerCase().slice(0, 20);
        setCurrentSrc(`https://picsum.photos/seed/${seed}/200/300`); // Updated picsum dimensions
      }}
      onLoadingComplete={() => setIsLoading(false)}
      data-ai-hint={aiHint || alt.split(' ').slice(0, 2).join(' ').toLowerCase()}
      priority={priority}
      sizes="200px" // Updated sizes attribute
    />
  );
};


const mockSilhouetteData = [
  { monthYear: 'Jan 2023', aLine: 30, sheath: 40, oversized: 20, bodycon: 35, asymmetrical: 15 },
  { monthYear: 'Feb 2023', aLine: 32, sheath: 42, oversized: 25, bodycon: 30, asymmetrical: 18 },
  { monthYear: 'Mar 2023', aLine: 35, sheath: 38, oversized: 30, bodycon: 28, asymmetrical: 22 },
  { monthYear: 'Apr 2023', aLine: 38, sheath: 35, oversized: 35, bodycon: 30, asymmetrical: 25 },
  { monthYear: 'May 2023', aLine: 42, sheath: 32, oversized: 40, bodycon: 32, asymmetrical: 28 },
  { monthYear: 'Jun 2023', aLine: 45, sheath: 30, oversized: 45, bodycon: 35, asymmetrical: 30 },
  { monthYear: 'Jul 2023', aLine: 48, sheath: 28, oversized: 50, bodycon: 38, asymmetrical: 33 },
  { monthYear: 'Aug 2023', aLine: 50, sheath: 25, oversized: 55, bodycon: 40, asymmetrical: 35 },
  { monthYear: 'Sep 2023', aLine: 52, sheath: 22, oversized: 60, bodycon: 42, asymmetrical: 40 },
  { monthYear: 'Oct 2023', aLine: 55, sheath: 20, oversized: 65, bodycon: 45, asymmetrical: 45 },
  { monthYear: 'Nov 2023', aLine: 58, sheath: 18, oversized: 68, bodycon: 42, asymmetrical: 48 },
  { monthYear: 'Dec 2023', aLine: 60, sheath: 15, oversized: 70, bodycon: 40, asymmetrical: 50 },
  { monthYear: 'Jan 2024', aLine: 62, sheath: 18, oversized: 72, bodycon: 38, asymmetrical: 52 },
  { monthYear: 'Feb 2024', aLine: 65, sheath: 20, oversized: 75, bodycon: 35, asymmetrical: 55 },
  { monthYear: 'Mar 2024', aLine: 62, sheath: 22, oversized: 78, bodycon: 38, asymmetrical: 58 },
  { monthYear: 'Apr 2024', aLine: 60, sheath: 25, oversized: 80, bodycon: 40, asymmetrical: 60 },
  { monthYear: 'May 2024', aLine: 58, sheath: 28, oversized: 82, bodycon: 42, asymmetrical: 62 },
  { monthYear: 'Jun 2024', aLine: 55, sheath: 30, oversized: 85, bodycon: 45, asymmetrical: 65 },
  { monthYear: 'Jul 2024', aLine: 52, sheath: 32, oversized: 88, bodycon: 48, asymmetrical: 68 },
  { monthYear: 'Aug 2024', aLine: 50, sheath: 35, oversized: 90, bodycon: 50, asymmetrical: 70 },
  { monthYear: 'Sep 2024', aLine: 48, sheath: 38, oversized: 92, bodycon: 52, asymmetrical: 72 },
  { monthYear: 'Oct 2024', aLine: 45, sheath: 40, oversized: 95, bodycon: 55, asymmetrical: 75 },
  { monthYear: 'Nov 2024', aLine: 42, sheath: 42, oversized: 98, bodycon: 58, asymmetrical: 78 },
  { monthYear: 'Dec 2024', aLine: 40, sheath: 45, oversized: 100, bodycon: 60, asymmetrical: 80 },
  { monthYear: 'Jan 2025', aLine: 38, sheath: 48, oversized: 102, bodycon: 62, asymmetrical: 82 },
  { monthYear: 'Feb 2025', aLine: 35, sheath: 50, oversized: 105, bodycon: 65, asymmetrical: 85 },
  { monthYear: 'Mar 2025', aLine: 32, sheath: 52, oversized: 108, bodycon: 68, asymmetrical: 88 },
  { monthYear: 'Apr 2025', aLine: 30, sheath: 55, oversized: 110, bodycon: 70, asymmetrical: 90 },
];


const mockColorData = [
  { name: 'Deep Sapphire', value: 400, translationKey: 'analyticsPage.color.deepSapphire' },
  { name: 'Desert Khaki', value: 300, translationKey: 'analyticsPage.color.desertKhaki' },
  { name: 'Rich Burgundy', value: 280, translationKey: 'analyticsPage.color.richBurgundy' },
  { name: 'Forest Green', value: 220, translationKey: 'analyticsPage.color.forestGreen' },
  { name: 'Warm Terracotta', value: 180, translationKey: 'analyticsPage.color.warmTerracotta' },
];

const COLORS = ['#1E3A8A', '#BEB7A4', '#831843', '#166534', '#E2725B']; 

const mockPatternLineData = [
  { monthYear: 'Jan 2023', floral: 20, geometric: 15, stripes: 25, animalPrints: 10, abstract: 18 },
  { monthYear: 'Feb 2023', floral: 22, geometric: 17, stripes: 28, animalPrints: 12, abstract: 20 },
  { monthYear: 'Mar 2023', floral: 25, geometric: 20, stripes: 32, animalPrints: 15, abstract: 23 },
  { monthYear: 'Apr 2023', floral: 28, geometric: 22, stripes: 35, animalPrints: 18, abstract: 27 },
  { monthYear: 'May 2023', floral: 32, geometric: 25, stripes: 39, animalPrints: 22, abstract: 30 },
  { monthYear: 'Jun 2023', floral: 35, geometric: 28, stripes: 42, animalPrints: 25, abstract: 34 },
  { monthYear: 'Jul 2023', floral: 39, geometric: 32, stripes: 46, animalPrints: 29, abstract: 38 },
  { monthYear: 'Aug 2023', floral: 42, geometric: 35, stripes: 49, animalPrints: 33, abstract: 41 },
  { monthYear: 'Sep 2023', floral: 46, geometric: 38, stripes: 53, animalPrints: 37, abstract: 45 },
  { monthYear: 'Oct 2023', floral: 50, geometric: 42, stripes: 57, animalPrints: 41, abstract: 49 },
  { monthYear: 'Nov 2023', floral: 53, geometric: 45, stripes: 60, animalPrints: 45, abstract: 52 },
  { monthYear: 'Dec 2023', floral: 57, geometric: 48, stripes: 64, animalPrints: 48, abstract: 56 },
  { monthYear: 'Jan 2024', floral: 60, geometric: 52, stripes: 68, animalPrints: 52, abstract: 60 },
  { monthYear: 'Feb 2024', floral: 63, geometric: 55, stripes: 71, animalPrints: 55, abstract: 63 },
  { monthYear: 'Mar 2024', floral: 67, geometric: 59, stripes: 75, animalPrints: 59, abstract: 67 },
  { monthYear: 'Apr 2024', floral: 70, geometric: 62, stripes: 78, animalPrints: 63, abstract: 70 },
  { monthYear: 'May 2024', floral: 72, geometric: 65, stripes: 80, animalPrints: 65, abstract: 72 },
  { monthYear: 'Jun 2024', floral: 75, geometric: 68, stripes: 83, animalPrints: 68, abstract: 75 },
  { monthYear: 'Jul 2024', floral: 78, geometric: 72, stripes: 86, animalPrints: 71, abstract: 78 },
  { monthYear: 'Aug 2024', floral: 80, geometric: 75, stripes: 89, animalPrints: 74, abstract: 80 },
  { monthYear: 'Sep 2024', floral: 78, geometric: 78, stripes: 92, animalPrints: 77, abstract: 78 }, // Floral starts slight dip
  { monthYear: 'Oct 2024', floral: 75, geometric: 82, stripes: 95, animalPrints: 80, abstract: 75 }, // Floral continues dip, Abstract starts dip
  { monthYear: 'Nov 2024', floral: 72, geometric: 85, stripes: 98, animalPrints: 83, abstract: 72 },
  { monthYear: 'Dec 2024', floral: 68, geometric: 88, stripes: 100, animalPrints: 86, abstract: 68 },
  { monthYear: 'Jan 2025', floral: 64, geometric: 92, stripes: 102, animalPrints: 89, abstract: 64 }, // Downtrend for Floral & Abstract
  { monthYear: 'Feb 2025', floral: 60, geometric: 95, stripes: 105, animalPrints: 92, abstract: 60 },
  { monthYear: 'Mar 2025', floral: 55, geometric: 98, stripes: 108, animalPrints: 95, abstract: 55 },
  { monthYear: 'Apr 2025', floral: 50, geometric: 100, stripes: 110, animalPrints: 98, abstract: 50 },
];


const chartConfigColor = (t: (key: string) => string) => ({
  value: {
    label: t('analyticsPage.popularity'), 
  },
  ...mockColorData.reduce((acc, item, index) => {
    acc[item.name] = { label: t(item.translationKey as any), color: COLORS[index % COLORS.length] };
    return acc;
  }, {} as any)
});


export default function AnalyticsPage() {
  const { t } = useLanguage();
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const silhouetteChartConfig = {
    aLine: { label: t('analyticsPage.silhouette.aLine'), color: "hsl(var(--chart-1))" },
    sheath: { label: t('analyticsPage.silhouette.sheath'), color: "hsl(var(--chart-2))" },
    oversized: { label: t('analyticsPage.silhouette.oversized'), color: "hsl(var(--chart-3))" },
    bodycon: { label: t('analyticsPage.silhouette.bodycon'), color: "hsl(var(--chart-4))" },
    asymmetrical: { label: t('analyticsPage.silhouette.asymmetrical'), color: "hsl(var(--chart-5))" },
  };

  const carouselImages = [
    { src: '/images/gala_image_2.jpeg', alt: 'People attending a glamorous gala event', "data-ai-hint": "gala event" },
    { src: '/images/image_gala_1.jpeg', alt: 'Elegant guests at a formal gala gathering', "data-ai-hint": "fashion model" },
  ];

  const patternChartConfig = {
    floral: { label: t('analyticsPage.pattern.floral'), color: "hsl(var(--chart-6))" },
    geometric: { label: t('analyticsPage.pattern.geometric'), color: "hsl(var(--chart-7))" },
    stripes: { label: t('analyticsPage.pattern.stripes'), color: "hsl(var(--chart-8))" },
    animalPrints: { label: t('analyticsPage.pattern.animalPrints'), color: "hsl(var(--chart-9))" },
    abstract: { label: t('analyticsPage.pattern.abstract'), color: "hsl(var(--chart-10))" },
  };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Newspaper className="mr-2 h-6 w-6 text-primary" />
            {t('analyticsPage.latestTrendTitle')}
          </CardTitle>
          <CardDescription>
            {t('analyticsPage.latestTrendDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Carousel
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg" // Reduced max-width
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center items-center py-4"> {/* Centering wrapper */}
                    <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden shadow-md"> {/* Fixed size container */}
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        aiHint={image['data-ai-hint']}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>

          <h3 className="text-xl font-semibold pt-4">{t('analyticsPage.galaArticle.title')}</h3>
          <p className="text-base text-muted-foreground">
            {t('analyticsPage.galaArticle.paragraph1')}
          </p>
          <p className="text-base text-muted-foreground">
            {t('analyticsPage.galaArticle.paragraph2')}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              {t('analyticsPage.silhouettePopularityTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={silhouetteChartConfig} className="h-[300px] w-full">
              <LineChart data={mockSilhouetteData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey="monthYear" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  interval="preserveStartEnd"
                  minTickGap={20}
                  tickFormatter={(value) => value.substring(0,3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <RechartsTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="aLine" 
                  stroke="var(--color-aLine)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-aLine)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.aLine')}
                />
                <Line 
                  type="monotone" 
                  dataKey="sheath" 
                  stroke="var(--color-sheath)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-sheath)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.sheath')}
                />
                <Line 
                  type="monotone" 
                  dataKey="oversized" 
                  stroke="var(--color-oversized)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-oversized)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.oversized')}
                />
                <Line 
                  type="monotone" 
                  dataKey="bodycon" 
                  stroke="var(--color-bodycon)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-bodycon)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.bodycon')}
                />
                <Line 
                  type="monotone" 
                  dataKey="asymmetrical" 
                  stroke="var(--color-asymmetrical)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-asymmetrical)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.silhouette.asymmetrical')}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5 text-primary" />
              {t('analyticsPage.colorTrendsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigColor(t)} className="h-[300px] w-full">
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

        <Card className="shadow-lg md:col-span-2"> 
          <CardHeader>
            <CardTitle className="flex items-center">
              <Layers className="mr-2 h-5 w-5 text-primary" />
              {t('analyticsPage.patternTrendsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={patternChartConfig} className="h-[300px] w-full">
              <LineChart data={mockPatternLineData} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey="monthYear" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  interval="preserveStartEnd"
                  minTickGap={20}
                  tickFormatter={(value) => value.substring(0,3)}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <RechartsTooltip cursor={true} content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="floral" 
                  stroke="var(--color-floral)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-floral)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.pattern.floral')}
                />
                <Line 
                  type="monotone" 
                  dataKey="geometric" 
                  stroke="var(--color-geometric)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-geometric)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.pattern.geometric')}
                />
                <Line 
                  type="monotone" 
                  dataKey="stripes" 
                  stroke="var(--color-stripes)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-stripes)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.pattern.stripes')}
                />
                <Line 
                  type="monotone" 
                  dataKey="animalPrints" 
                  stroke="var(--color-animalPrints)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-animalPrints)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.pattern.animalPrints')}
                />
                <Line 
                  type="monotone" 
                  dataKey="abstract" 
                  stroke="var(--color-abstract)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-abstract)" }} 
                  activeDot={{ r: 5 }}
                  name={t('analyticsPage.pattern.abstract')}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

