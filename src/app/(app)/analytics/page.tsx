
// analytics/page.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Newspaper, TrendingUp, Layers, Settings, Image as ImageIcon, Loader2 } from 'lucide-react'; 
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, CartesianGrid, Line } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { useLanguage } from '@/context/language-context';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { TranslationKey } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateColorTrendImage, type GenerateColorTrendImageOutput } from '@/ai/flows/generate-color-trend-image-flow';
import { useToast } from '@/hooks/use-toast';

// Component for rendering images with a fallback to placehold.co
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  aiHint?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  onImageError?: () => void;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  aiHint, 
  priority = false, 
  width, 
  height, 
  fill = false, 
  className = "object-cover",
  sizes,
  onImageError
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setCurrentSrc(src); 
    setIsLoading(true);
  }, [src]);

  const placeholderBaseWidth = fill ? 600 : (width || 200);
  const placeholderBaseHeight = fill ? 400 : (height || 300);
  const fallbackSrc = `https://placehold.co/${placeholderBaseWidth}x${placeholderBaseHeight}.png`;

  return (
    <Image
      src={currentSrc || fallbackSrc} // Ensure there's always a src
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={`${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      onError={() => {
        setIsLoading(false);
        if (currentSrc !== fallbackSrc) { // Avoid infinite loop if fallback itself fails
            setCurrentSrc(fallbackSrc);
        }
        if (onImageError) onImageError();
      }}
      onLoad={() => setIsLoading(false)}
      data-ai-hint={aiHint || alt.split(' ').slice(0, 2).join(' ').toLowerCase()}
      priority={priority}
      sizes={sizes || (fill ? "100vw" : `${width}px`)}
    />
  );
};


const mockSilhouetteData = [
  { monthYear: 'Jan-2023', aLine: 30, sheath: 40, oversized: 20, bodycon: 35, asymmetrical: 15 },
  { monthYear: 'Feb-2023', aLine: 32, sheath: 42, oversized: 25, bodycon: 30, asymmetrical: 18 },
  { monthYear: 'Mar-2023', aLine: 35, sheath: 38, oversized: 30, bodycon: 28, asymmetrical: 22 },
  { monthYear: 'Apr-2023', aLine: 38, sheath: 35, oversized: 35, bodycon: 30, asymmetrical: 25 },
  { monthYear: 'May-2023', aLine: 42, sheath: 32, oversized: 40, bodycon: 32, asymmetrical: 28 },
  { monthYear: 'Jun-2023', aLine: 45, sheath: 30, oversized: 45, bodycon: 35, asymmetrical: 30 },
  { monthYear: 'Jul-2023', aLine: 48, sheath: 28, oversized: 50, bodycon: 38, asymmetrical: 33 },
  { monthYear: 'Aug-2023', aLine: 50, sheath: 25, oversized: 55, bodycon: 40, asymmetrical: 35 },
  { monthYear: 'Sep-2023', aLine: 52, sheath: 22, oversized: 60, bodycon: 42, asymmetrical: 40 },
  { monthYear: 'Oct-2023', aLine: 55, sheath: 20, oversized: 65, bodycon: 45, asymmetrical: 45 },
  { monthYear: 'Nov-2023', aLine: 58, sheath: 18, oversized: 68, bodycon: 42, asymmetrical: 48 },
  { monthYear: 'Dec-2023', aLine: 60, sheath: 15, oversized: 70, bodycon: 40, asymmetrical: 50 },
  { monthYear: 'Jan-2024', aLine: 62, sheath: 18, oversized: 72, bodycon: 38, asymmetrical: 52 },
  { monthYear: 'Feb-2024', aLine: 65, sheath: 20, oversized: 75, bodycon: 35, asymmetrical: 55 },
  { monthYear: 'Mar-2024', aLine: 62, sheath: 22, oversized: 78, bodycon: 38, asymmetrical: 58 },
  { monthYear: 'Apr-2024', aLine: 60, sheath: 25, oversized: 80, bodycon: 40, asymmetrical: 60 },
  { monthYear: 'May-2024', aLine: 58, sheath: 28, oversized: 82, bodycon: 42, asymmetrical: 62 },
  { monthYear: 'Jun-2024', aLine: 55, sheath: 30, oversized: 85, bodycon: 45, asymmetrical: 65 },
  { monthYear: 'Jul-2024', aLine: 52, sheath: 32, oversized: 88, bodycon: 48, asymmetrical: 68 },
  { monthYear: 'Aug-2024', aLine: 50, sheath: 35, oversized: 90, bodycon: 50, asymmetrical: 70 },
  { monthYear: 'Sep-2024', aLine: 48, sheath: 38, oversized: 92, bodycon: 52, asymmetrical: 72 },
  { monthYear: 'Oct-2024', aLine: 45, sheath: 40, oversized: 95, bodycon: 55, asymmetrical: 75 },
  { monthYear: 'Nov-2024', aLine: 42, sheath: 42, oversized: 98, bodycon: 58, asymmetrical: 78 },
  { monthYear: 'Dec-2024', aLine: 40, sheath: 45, oversized: 100, bodycon: 60, asymmetrical: 80 },
  { monthYear: 'Jan-2025', aLine: 38, sheath: 48, oversized: 102, bodycon: 62, asymmetrical: 82 },
  { monthYear: 'Feb-2025', aLine: 35, sheath: 50, oversized: 105, bodycon: 65, asymmetrical: 85 },
  { monthYear: 'Mar-2025', aLine: 32, sheath: 52, oversized: 108, bodycon: 68, asymmetrical: 88 },
  { monthYear: 'Apr-2025', aLine: 30, sheath: 55, oversized: 110, bodycon: 70, asymmetrical: 90 },
];

const mockWeeklySilhouetteData = [
  // Oct 2024
  { weekLabel: 'W1 Oct-2024', aLine: 45, sheath: 40, oversized: 95, bodycon: 55, asymmetrical: 75 },
  { weekLabel: 'W2 Oct-2024', aLine: 44, sheath: 41, oversized: 96, bodycon: 56, asymmetrical: 76 },
  { weekLabel: 'W3 Oct-2024', aLine: 45, sheath: 40, oversized: 95, bodycon: 55, asymmetrical: 75 },
  { weekLabel: 'W4 Oct-2024', aLine: 43, sheath: 42, oversized: 97, bodycon: 57, asymmetrical: 77 },
  // Nov 2024
  { weekLabel: 'W1 Nov-2024', aLine: 42, sheath: 42, oversized: 98, bodycon: 58, asymmetrical: 78 },
  { weekLabel: 'W2 Nov-2024', aLine: 41, sheath: 43, oversized: 99, bodycon: 59, asymmetrical: 79 },
  { weekLabel: 'W3 Nov-2024', aLine: 42, sheath: 42, oversized: 98, bodycon: 58, asymmetrical: 78 },
  { weekLabel: 'W4 Nov-2024', aLine: 40, sheath: 44, oversized: 100, bodycon: 60, asymmetrical: 80 },
  // Dec 2024
  { weekLabel: 'W1 Dec-2024', aLine: 40, sheath: 45, oversized: 100, bodycon: 60, asymmetrical: 80 },
  { weekLabel: 'W2 Dec-2024', aLine: 39, sheath: 46, oversized: 101, bodycon: 61, asymmetrical: 81 },
  { weekLabel: 'W3 Dec-2024', aLine: 40, sheath: 45, oversized: 100, bodycon: 60, asymmetrical: 80 },
  { weekLabel: 'W4 Dec-2024', aLine: 38, sheath: 47, oversized: 102, bodycon: 62, asymmetrical: 82 },
];

interface MockColorEntry {
  name: string; 
  value: number;
  translationKey: TranslationKey;
  descriptionKey: TranslationKey; 
  imagePlaceholderText: string; 
  aiHint: string; 
}

const mockColorData: MockColorEntry[] = [
  { name: 'Deep Sapphire', value: 400, translationKey: 'analyticsPage.color.deepSapphire' as TranslationKey, descriptionKey: 'analyticsPage.colorDescriptions.deepSapphire' as TranslationKey, imagePlaceholderText: 'Deep+Sapphire+fashion', aiHint: 'sapphire fashion' },
  { name: 'Desert Khaki', value: 300, translationKey: 'analyticsPage.color.desertKhaki' as TranslationKey, descriptionKey: 'analyticsPage.colorDescriptions.desertKhaki' as TranslationKey, imagePlaceholderText: 'Desert+Khaki+clothing', aiHint: 'khaki clothing' },
  { name: 'Rich Burgundy', value: 280, translationKey: 'analyticsPage.color.richBurgundy' as TranslationKey, descriptionKey: 'analyticsPage.colorDescriptions.richBurgundy' as TranslationKey, imagePlaceholderText: 'Rich+Burgundy+dress', aiHint: 'burgundy dress' },
  { name: 'Forest Green', value: 220, translationKey: 'analyticsPage.color.forestGreen' as TranslationKey, descriptionKey: 'analyticsPage.colorDescriptions.forestGreen' as TranslationKey, imagePlaceholderText: 'Forest+Green+sweater', aiHint: 'green sweater' },
  { name: 'Warm Terracotta', value: 180, translationKey: 'analyticsPage.color.warmTerracotta' as TranslationKey, descriptionKey: 'analyticsPage.colorDescriptions.warmTerracotta' as TranslationKey, imagePlaceholderText: 'Warm+Terracotta+outfit', aiHint: 'terracotta outfit' },
];


const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const mockPatternLineData = [
  { monthYear: 'Jan-2023', floral: 20, geometric: 15, stripes: 25, animalPrints: 10, abstract: 18 },
  { monthYear: 'Feb-2023', floral: 22, geometric: 17, stripes: 28, animalPrints: 12, abstract: 20 },
  { monthYear: 'Mar-2023', floral: 25, geometric: 20, stripes: 32, animalPrints: 15, abstract: 23 },
  { monthYear: 'Apr-2023', floral: 28, geometric: 22, stripes: 35, animalPrints: 18, abstract: 27 },
  { monthYear: 'May-2023', floral: 32, geometric: 25, stripes: 39, animalPrints: 22, abstract: 30 },
  { monthYear: 'Jun-2023', floral: 35, geometric: 28, stripes: 42, animalPrints: 25, abstract: 34 },
  { monthYear: 'Jul-2023', floral: 39, geometric: 32, stripes: 46, animalPrints: 29, abstract: 38 },
  { monthYear: 'Aug-2023', floral: 42, geometric: 35, stripes: 49, animalPrints: 33, abstract: 41 },
  { monthYear: 'Sep-2023', floral: 46, geometric: 38, stripes: 53, animalPrints: 37, abstract: 45 },
  { monthYear: 'Oct-2023', floral: 50, geometric: 42, stripes: 57, animalPrints: 41, abstract: 49 },
  { monthYear: 'Nov-2023', floral: 53, geometric: 45, stripes: 60, animalPrints: 45, abstract: 52 },
  { monthYear: 'Dec-2023', floral: 57, geometric: 48, stripes: 64, animalPrints: 48, abstract: 56 },
  { monthYear: 'Jan-2024', floral: 55, geometric: 52, stripes: 68, animalPrints: 52, abstract: 53 }, // Floral down
  { monthYear: 'Feb-2024', floral: 52, geometric: 55, stripes: 71, animalPrints: 55, abstract: 50 }, // Floral down
  { monthYear: 'Mar-2024', floral: 48, geometric: 59, stripes: 75, animalPrints: 59, abstract: 46 }, // Floral down
  { monthYear: 'Apr-2024', floral: 45, geometric: 62, stripes: 78, animalPrints: 63, abstract: 42 }, // Floral down
  { monthYear: 'May-2024', floral: 42, geometric: 65, stripes: 80, animalPrints: 65, abstract: 38 }, // Floral down
  { monthYear: 'Jun-2024', floral: 40, geometric: 68, stripes: 83, animalPrints: 68, abstract: 35 }, // Floral down
  { monthYear: 'Jul-2024', floral: 38, geometric: 72, stripes: 86, animalPrints: 71, abstract: 32 }, // Floral down
  { monthYear: 'Aug-2024', floral: 35, geometric: 75, stripes: 89, animalPrints: 74, abstract: 30 }, // Floral down
  { monthYear: 'Sep-2024', floral: 32, geometric: 78, stripes: 92, animalPrints: 77, abstract: 28 }, 
  { monthYear: 'Oct-2024', floral: 30, geometric: 82, stripes: 95, animalPrints: 80, abstract: 25 }, 
  { monthYear: 'Nov-2024', floral: 28, geometric: 85, stripes: 98, animalPrints: 83, abstract: 22 },
  { monthYear: 'Dec-2024', floral: 25, geometric: 88, stripes: 100, animalPrints: 86, abstract: 20 },
  { monthYear: 'Jan-2025', floral: 22, geometric: 92, stripes: 102, animalPrints: 89, abstract: 18 }, 
  { monthYear: 'Feb-2025', floral: 20, geometric: 95, stripes: 105, animalPrints: 92, abstract: 15 },
  { monthYear: 'Mar-2025', floral: 18, geometric: 98, stripes: 108, animalPrints: 95, abstract: 12 },
  { monthYear: 'Apr-2025', floral: 15, geometric: 100, stripes: 110, animalPrints: 98, abstract: 10 },
];

const mockWeeklyPatternLineData = [
  // Oct 2024
  { weekLabel: 'W1 Oct-2024', floral: 30, geometric: 82, stripes: 95, animalPrints: 80, abstract: 25 },
  { weekLabel: 'W2 Oct-2024', floral: 29, geometric: 83, stripes: 96, animalPrints: 81, abstract: 24 },
  { weekLabel: 'W3 Oct-2024', floral: 30, geometric: 82, stripes: 95, animalPrints: 80, abstract: 25 },
  { weekLabel: 'W4 Oct-2024', floral: 28, geometric: 84, stripes: 97, animalPrints: 82, abstract: 23 },
  // Nov 2024
  { weekLabel: 'W1 Nov-2024', floral: 28, geometric: 85, stripes: 98, animalPrints: 83, abstract: 22 },
  { weekLabel: 'W2 Nov-2024', floral: 27, geometric: 86, stripes: 99, animalPrints: 84, abstract: 21 },
  { weekLabel: 'W3 Nov-2024', floral: 28, geometric: 85, stripes: 98, animalPrints: 83, abstract: 22 },
  { weekLabel: 'W4 Nov-2024', floral: 26, geometric: 87, stripes: 100, animalPrints: 85, abstract: 20 },
  // Dec 2024
  { weekLabel: 'W1 Dec-2024', floral: 25, geometric: 88, stripes: 100, animalPrints: 86, abstract: 20 },
  { weekLabel: 'W2 Dec-2024', floral: 24, geometric: 89, stripes: 101, animalPrints: 87, abstract: 19 },
  { weekLabel: 'W3 Dec-2024', floral: 25, geometric: 88, stripes: 100, animalPrints: 86, abstract: 20 },
  { weekLabel: 'W4 Dec-2024', floral: 23, geometric: 90, stripes: 102, animalPrints: 88, abstract: 18 },
];


const chartConfigColorFn = (t: (key: string) => string): ChartConfig => ({
  value: {
    label: t('analyticsPage.popularity'), 
  },
  ...mockColorData.reduce((acc, item) => {
    acc[item.name] = { label: t(item.translationKey as any), color: COLORS[mockColorData.indexOf(item) % COLORS.length] };
    return acc;
  }, {} as any)
});

const carouselImages = [
  { src: "/images/gala_image_2.jpeg", alt: "People attending a glamorous gala event", "data-ai-hint": "gala event" },
  { src: "/images/image_gala_1.jpeg", alt: "Elegant guests at a formal gala gathering", "data-ai-hint": "fashion model" },
];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = React.useState(false);
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [pageDescription, setPageDescription] = React.useState<string | null>(null);
  const [timeGranularity, setTimeGranularity] = React.useState<'monthly' | 'weekly'>('monthly');
  
  const [isColorDetailDialogOpen, setIsColorDetailDialogOpen] = React.useState(false);
  const [selectedColorData, setSelectedColorData] = React.useState<MockColorEntry | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = React.useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = React.useState(false);


  React.useEffect(() => {
    setIsMounted(true);
    setPageDescription(t('analyticsPage.latestTrendDescription'));
  }, [t]);

  const silhouetteChartConfig = React.useMemo(() => ({
    aLine: { label: t('analyticsPage.silhouette.aLine'), color: "hsl(var(--chart-1))" },
    sheath: { label: t('analyticsPage.silhouette.sheath'), color: "hsl(var(--chart-2))" },
    oversized: { label: t('analyticsPage.silhouette.oversized'), color: "hsl(var(--chart-3))" },
    bodycon: { label: t('analyticsPage.silhouette.bodycon'), color: "hsl(var(--chart-4))" },
    asymmetrical: { label: t('analyticsPage.silhouette.asymmetrical'), color: "hsl(var(--chart-5))" },
  }), [t]);

  const currentChartConfigColor = React.useMemo(() => chartConfigColorFn(t), [t]);

  const patternChartConfig = React.useMemo(() => ({
    floral: { label: t('analyticsPage.pattern.floral'), color: "hsl(var(--chart-6))" }, // Purple
    geometric: { label: t('analyticsPage.pattern.geometric'), color: "hsl(var(--chart-7))" }, // Orange
    stripes: { label: t('analyticsPage.pattern.stripes'), color: "hsl(var(--chart-8))" }, // Seafoam Green
    animalPrints: { label: t('analyticsPage.pattern.animalPrints'), color: "hsl(var(--chart-9))" }, // Coral Red
    abstract: { label: t('analyticsPage.pattern.abstract'), color: "hsl(var(--chart-10))" }, // Gold/Yellow
  }), [t]);
  
  const translatedMockColorData = React.useMemo(() => {
    return mockColorData.map(item => ({
      ...item,
      name: t(item.translationKey as any) 
    }));
  }, [t]);

  const silhouetteChartDataToDisplay = React.useMemo(() => {
    if (timeGranularity === 'weekly') {
        return mockWeeklySilhouetteData;
    }
    // Filter for 2025 data for monthly view
    return mockSilhouetteData.filter(data => data.monthYear.endsWith('-2025'));
  }, [timeGranularity]);


  const patternChartDataToDisplay = React.useMemo(() => {
    return timeGranularity === 'weekly' ? mockWeeklyPatternLineData : mockPatternLineData;
  }, [timeGranularity]);

  const handleColorPieClick = async (eventData: any) => {
    const originalEntry = mockColorData.find(
      (color) => t(color.translationKey as any) === eventData.name
    );
    if (originalEntry) {
      setSelectedColorData(originalEntry);
      setGeneratedImageUrl(null); // Reset previous image
      setIsGeneratingImage(true);
      setIsColorDetailDialogOpen(true);

      try {
        const result: GenerateColorTrendImageOutput = await generateColorTrendImage({
          colorName: originalEntry.name, // Use original English name for prompt
          colorDescription: t(originalEntry.descriptionKey as any), // Translated description for context
        });
        setGeneratedImageUrl(result.imageDataUri);
      } catch (error) {
        console.error("Error generating image:", error);
        toast({
          title: t('analyticsPage.colorDetailDialog.imageGenErrorTitle'),
          description: (error as Error).message || t('analyticsPage.colorDetailDialog.imageGenErrorDescription'),
          variant: "destructive",
        });
        // Keep generatedImageUrl as null, ImageWithFallback will use its placeholder
      } finally {
        setIsGeneratingImage(false);
      }
    }
  };


  if (!isMounted) {
    return (
        <div className="space-y-6 p-4">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="h-8 w-3/4 animate-pulse rounded bg-muted mb-2"></div>
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted"></div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="mx-auto h-[300px] w-full max-w-sm animate-pulse rounded-lg bg-muted"></div>
                    <div className="h-6 w-1/3 animate-pulse rounded bg-muted pt-4"></div>
                    <div className="h-10 w-full animate-pulse rounded bg-muted"></div>
                    <div className="h-10 w-full animate-pulse rounded bg-muted"></div>
                </CardContent>
            </Card>
            <Card className="shadow-lg mb-6">
              <CardHeader><div className="h-6 w-1/2 animate-pulse rounded bg-muted"></div></CardHeader>
              <CardContent><div className="h-10 w-1/3 animate-pulse rounded bg-muted"></div></CardContent>
            </Card>
             <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-lg">
                  <CardHeader><div className="h-6 w-1/2 animate-pulse rounded bg-muted"></div></CardHeader>
                  <CardContent><div className="h-[300px] w-full animate-pulse rounded bg-muted"></div></CardContent>
                </Card>
                <Card className="shadow-lg">
                  <CardHeader><div className="h-6 w-1/2 animate-pulse rounded bg-muted"></div></CardHeader>
                  <CardContent><div className="h-[300px] w-full animate-pulse rounded bg-muted"></div></CardContent>
                </Card>
             </div>
             <Card className="shadow-lg md:col-span-2">
                <CardHeader><div className="h-6 w-1/2 animate-pulse rounded bg-muted"></div></CardHeader>
                <CardContent><div className="h-[300px] w-full animate-pulse rounded bg-muted"></div></CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Newspaper className="mr-2 h-6 w-6 text-primary" />
            {t('analyticsPage.latestTrendTitle')}
          </CardTitle>
          <CardDescription>
             {pageDescription === null ? <>&nbsp;</> : pageDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Carousel
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg"
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex justify-center items-center py-4">
                    <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden shadow-md">
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        aiHint={image['data-ai-hint']}
                        priority={index === 0}
                        width={200}
                        height={300}
                        sizes="200px"
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

      <Card className="shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <Settings className="mr-2 h-5 w-5 text-primary" />
            {t('analyticsPage.chartSettings.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Label htmlFor="timeGranularitySelect" className="text-base">
              {t('analyticsPage.timeGranularity.label')}
            </Label>
            <Select value={timeGranularity} onValueChange={(value) => setTimeGranularity(value as 'monthly' | 'weekly')}>
              <SelectTrigger id="timeGranularitySelect" className="w-[180px] text-base">
                <SelectValue placeholder={t('analyticsPage.timeGranularity.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly" className="text-base">{t('analyticsPage.timeGranularity.monthly')}</SelectItem>
                <SelectItem value="weekly" className="text-base">{t('analyticsPage.timeGranularity.weekly')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              <LineChart data={silhouetteChartDataToDisplay} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey={timeGranularity === 'weekly' ? 'weekLabel' : 'monthYear'}
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  interval="preserveStartEnd"
                  minTickGap={timeGranularity === 'weekly' ? 10 : 20}
                  tickFormatter={(value) => {
                    if (timeGranularity === 'weekly') return value.replace('-2024', '');
                    return value.replace('-2023', '').replace('-2024', '').replace('-2025', '');
                  }}
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
                  name={silhouetteChartConfig.aLine.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="sheath" 
                  stroke="var(--color-sheath)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-sheath)" }} 
                  activeDot={{ r: 5 }}
                  name={silhouetteChartConfig.sheath.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="oversized" 
                  stroke="var(--color-oversized)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-oversized)" }} 
                  activeDot={{ r: 5 }}
                  name={silhouetteChartConfig.oversized.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="bodycon" 
                  stroke="var(--color-bodycon)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-bodycon)" }} 
                  activeDot={{ r: 5 }}
                  name={silhouetteChartConfig.bodycon.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="asymmetrical" 
                  stroke="var(--color-asymmetrical)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-asymmetrical)" }} 
                  activeDot={{ r: 5 }}
                  name={silhouetteChartConfig.asymmetrical.label}
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
            <ChartContainer config={currentChartConfigColor} className="h-[300px] w-full">
              <PieChart accessibilityLayer>
                <RechartsTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend />
                <Pie 
                  data={translatedMockColorData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  label
                  onClick={handleColorPieClick}
                >
                  {translatedMockColorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="cursor-pointer"/>
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
              <LineChart data={patternChartDataToDisplay} accessibilityLayer margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis 
                  dataKey={timeGranularity === 'weekly' ? 'weekLabel' : 'monthYear'}
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8} 
                  interval="preserveStartEnd"
                  minTickGap={timeGranularity === 'weekly' ? 10 : 20}
                  tickFormatter={(value) => {
                     if (timeGranularity === 'weekly') return value.replace('-2024', '');
                    return value.replace('-2023', '').replace('-2024', '').replace('-2025', '');
                  }}
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
                  name={patternChartConfig.floral.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="geometric" 
                  stroke="var(--color-geometric)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-geometric)" }} 
                  activeDot={{ r: 5 }}
                  name={patternChartConfig.geometric.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="stripes" 
                  stroke="var(--color-stripes)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-stripes)" }} 
                  activeDot={{ r: 5 }}
                  name={patternChartConfig.stripes.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="animalPrints" 
                  stroke="var(--color-animalPrints)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-animalPrints)" }} 
                  activeDot={{ r: 5 }}
                  name={patternChartConfig.animalPrints.label}
                />
                <Line 
                  type="monotone" 
                  dataKey="abstract" 
                  stroke="var(--color-abstract)" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: "var(--color-abstract)" }} 
                  activeDot={{ r: 5 }}
                  name={patternChartConfig.abstract.label}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isColorDetailDialogOpen} onOpenChange={setIsColorDetailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t('analyticsPage.colorDetailDialog.title')} - {selectedColorData ? t(selectedColorData.translationKey as any) : ''}
            </DialogTitle>
            {selectedColorData && (
                <DialogDescription>
                    {t(selectedColorData.descriptionKey as any)}
                </DialogDescription>
            )}
          </DialogHeader>
          {selectedColorData && (
            <div className="space-y-4 py-4">
              <div className="relative w-full aspect-[3/2] rounded-md overflow-hidden bg-muted flex items-center justify-center">
                {isGeneratingImage ? (
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-2" />
                    <p>{t('analyticsPage.colorDetailDialog.imageGeneratingText')}</p>
                  </div>
                ) : (
                  <ImageWithFallback
                    src={generatedImageUrl || `https://placehold.co/600x400.png?text=${selectedColorData.imagePlaceholderText.replace(/\s+/g, '+')}`}
                    alt={t(selectedColorData.translationKey as any)}
                    aiHint={selectedColorData.aiHint}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onImageError={() => {
                        // This callback is triggered if ImageWithFallback's own src (either AI or placeholder) fails
                        // We might want to show a generic error image or message here if the placeholder itself fails
                        // For now, ImageWithFallback tries its own internal placeholder on error.
                    }}
                  />
                )}
              </div>
              
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

