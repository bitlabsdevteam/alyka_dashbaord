// src/lib/i18n.ts

export type Locale = 'en' | 'ja';

interface CommonTranslations {
  language: string;
  english: string;
  japanese: string;
  profile: string;
  logout: string;
}
interface AnalyticsPageTranslations {
  latestTrendTitle: string;
  latestTrendDescription: string;
  galaArticle: {
    title: string;
    paragraph1: string;
    paragraph2: string;
  };
  trendPopularityTitle: string; 
  colorTrendsTitle: string;
  popularity: string; 
  colorPopularity: string; // Can be deprecated if 'popularity' is used generically
  silhouettePopularityTitle: string; 
  silhouette: { 
    aLine: string;
    sheath: string;
    oversized: string;
    bodycon: string;
    asymmetrical: string;
  };
  patternTrendsTitle: string; // New
  color: { // New for specific color names
    ceruleanBlue: string;
    dustyRose: string;
    oliveGreen: string;
    mustardYellow: string;
    lavender: string;
  };
  pattern: { // New for specific pattern names
    floral: string;
    geometric: string;
    stripes: string;
    polkaDots: string;
    abstract: string;
    animalPrints: string; // Added for new line chart
  };
}

interface HeaderTranslations {
  userMenu: {
    label: string;
    greeting: string; 
    email: string; 
  }
}

interface NavTranslations {
  analytics: string;
  forecast: string;
  posSales: string; 
  taskManager: string; 
}

interface ForecastPageTranslations {
  selectSkuTitle: string;
  selectSkuDescription: string;
  skuLabel: string;
  selectSkuPlaceholder: string;
  currentStockLabel: string;
  forecastHorizonLabel: string;
  generateButton: string;
  generatingButton: string;
  forecastTitle: string; // e.g., "Stock Forecast for {{skuName}}"
  currentStockValueLabel: string;
  chart: {
    title: string;
    currentLabel: string; // For 'Current' period on X-axis
    forecastedStockLabel: string;
    currentStockLabel: string; // For legend/tooltip of current stock line
  };
  reasoningTitle: string;
  recommendationsTitle: string;
  errorAlertTitle: string;
  toast: {
    successTitle: string;
    successDescription: string; // e.g., "AI forecast generated for {{skuName}}."
    errorTitle: string;
    errorDescription: string;
    skuMissingTitle: string;
    skuMissingDescription: string;
  };
}


// This defines the structure of your translations
export interface Translations {
  common: CommonTranslations;
  analyticsPage: AnalyticsPageTranslations;
  header: HeaderTranslations;
  nav: NavTranslations;
  forecastPage: ForecastPageTranslations;
  // Add other pages/components here
  // settingsPage: { ... }
}

// Helper type for deep key access
type PathImpl<T, K extends keyof T> =
  K extends string
  ? T[K] extends Record<string, any>
    ? `${K}.${PathImpl<T[K], keyof T[K]> extends infer P ? P extends string ? P : never : never}` | `${K}.${Extract<keyof T[K], string>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

export type TranslationKey = Path<Translations>;


export const translations: Record<Locale, Translations> = {
  en: {
    common: {
      language: 'Language',
      english: 'English',
      japanese: '日本語 (Japanese)',
      profile: 'Profile',
      logout: 'Log out',
    },
    header: {
      userMenu: {
        label: 'User Menu',
        greeting: 'Analyst User',
        email: 'analyst@alyka.ai'
      }
    },
    nav: {
      analytics: 'Analytics',
      forecast: 'Forecast',
      posSales: 'POS Sales',
      taskManager: 'Task Manager',
    },
    analyticsPage: {
      latestTrendTitle: 'Latest Fashion Buzz',
      latestTrendDescription: 'Insights from the most recent GALA and runway shows.',
      galaArticle: {
        title: 'GALA 2024: A Night of Spectacular Fashion',
        paragraph1: 'The GALA 2024 red carpet was a breathtaking display of creativity and glamour. Designers pushed boundaries with innovative silhouettes, sustainable materials, and bold color choices. Themes of nature and technology intertwined, offering a glimpse into future fashion narratives.',
        paragraph2: 'Key takeaways include the resurgence of avant-garde tailoring, an emphasis on handcrafted details, and a notable shift towards gender-fluid designs. Metallic fabrics and ethereal sheers dominated, creating memorable moments that will undoubtedly influence upcoming B2B apparel collections.',
      },
      trendPopularityTitle: 'Key Trend Popularity Over Time',
      colorTrendsTitle: 'Color Trends',
      popularity: 'Popularity',
      colorPopularity: 'Popularity', 
      silhouettePopularityTitle: 'Silhouette Popularity Trends',
      silhouette: {
        aLine: 'A-Line',
        sheath: 'Sheath',
        oversized: 'Oversized/Boxy',
        bodycon: 'Bodycon',
        asymmetrical: 'Asymmetrical',
      },
      patternTrendsTitle: 'Pattern Popularity Trends',
      color: {
        ceruleanBlue: 'Cerulean Blue',
        dustyRose: 'Dusty Rose',
        oliveGreen: 'Olive Green',
        mustardYellow: 'Mustard Yellow',
        lavender: 'Lavender',
      },
      pattern: {
        floral: 'Floral',
        geometric: 'Geometric',
        stripes: 'Stripes',
        polkaDots: 'Polka Dots',
        abstract: 'Abstract',
        animalPrints: 'Animal Prints',
      },
    },
    forecastPage: {
      selectSkuTitle: 'SKU Stock Forecast',
      selectSkuDescription: 'Select an SKU and set a forecast horizon to generate its stock forecast.',
      skuLabel: 'Stock Keeping Unit (SKU)',
      selectSkuPlaceholder: 'Select an SKU',
      currentStockLabel: 'Current Stock',
      forecastHorizonLabel: 'Forecast Horizon',
      generateButton: 'Generate Forecast',
      generatingButton: 'Generating Forecast...',
      forecastTitle: 'Stock Forecast for {{skuName}}',
      currentStockValueLabel: 'Current Stock Level',
      chart: {
        title: 'Stock Level Over Time',
        currentLabel: 'Current',
        forecastedStockLabel: 'Forecasted Stock',
        currentStockLabel: 'Initial Stock Level',
      },
      reasoningTitle: 'Forecast Reasoning',
      recommendationsTitle: 'Recommendations',
      errorAlertTitle: 'Forecast Generation Failed',
      toast: {
        successTitle: 'Forecast Generated',
        successDescription: 'AI stock forecast for {{skuName}} is ready.',
        errorTitle: 'Forecast Error',
        errorDescription: 'An unexpected error occurred while generating the forecast.',
        skuMissingTitle: 'SKU Not Selected',
        skuMissingDescription: 'Please select an SKU before generating a forecast.',
      },
    },
  },
  ja: {
    common: {
      language: '言語',
      english: '英語',
      japanese: '日本語',
      profile: 'プロフィール',
      logout: 'ログアウト',
    },
    header: {
      userMenu: {
        label: 'ユーザーメニュー',
        greeting: 'アナリストユーザー',
        email: 'analyst@alyka.ai'
      }
    },
    nav: {
      analytics: '分析',
      forecast: '予測',
      posSales: 'POS販売',
      taskManager: 'タスク管理',
    },
    analyticsPage: {
      latestTrendTitle: '最新ファッショントレンド',
      latestTrendDescription: '最新のGALAやランウェイショーからの洞察。',
      galaArticle: {
        title: 'GALA 2024：壮観なファッションの夜',
        paragraph1: 'GALA 2024のレッドカーペットは、創造性と魅力の見事なディスプレイでした。デザイナーたちは革新的なシルエット、持続可能な素材、大胆な色の選択で境界を押し広げました。自然とテクノロジーのテーマが絡み合い、未来のファッションの物語を垣間見せました。',
        paragraph2: '主なポイントとしては、アバンギャルドなテーラリングの再興、手作りのディテールへの重点、そしてジェンダーフルイドデザインへの顕著なシフトが挙げられます。メタリックな生地や優美なシアー素材が主流となり、記憶に残る瞬間を生み出し、今後のB2Bアパレルコレクションに間違いなく影響を与えるでしょう。',
      },
      trendPopularityTitle: '主要トレンドの人気推移',
      colorTrendsTitle: 'カラートレンド',
      popularity: '人気度',
      colorPopularity: '人気度',
      silhouettePopularityTitle: 'シルエット人気トレンド',
      silhouette: {
        aLine: 'Aライン',
        sheath: 'シース',
        oversized: 'オーバーサイズ/ボクシー',
        bodycon: 'ボディコン',
        asymmetrical: 'アシンメトリー',
      },
      patternTrendsTitle: 'パターン人気トレンド',
      color: {
        ceruleanBlue: 'セルリアンブルー',
        dustyRose: 'ダスティーローズ',
        oliveGreen: 'オリーブグリーン',
        mustardYellow: 'マスタードイエロー',
        lavender: 'ラベンダー',
      },
      pattern: {
        floral: '花柄',
        geometric: '幾何学模様',
        stripes: 'ストライプ',
        polkaDots: '水玉模様',
        abstract: '抽象柄',
        animalPrints: 'アニマルプリント',
      },
    },
    forecastPage: {
      selectSkuTitle: 'SKU在庫予測',
      selectSkuDescription: 'SKUを選択し、予測期間を設定して在庫予測を生成します。',
      skuLabel: 'SKU (最小管理単位)',
      selectSkuPlaceholder: 'SKUを選択してください',
      currentStockLabel: '現在の在庫',
      forecastHorizonLabel: '予測期間',
      generateButton: '予測を生成',
      generatingButton: '予測を生成中...',
      forecastTitle: '{{skuName}}の在庫予測',
      currentStockValueLabel: '現在の在庫レベル',
      chart: {
        title: '在庫レベルの推移',
        currentLabel: '現在',
        forecastedStockLabel: '予測在庫',
        currentStockLabel: '初期在庫レベル',
      },
      reasoningTitle: '予測の根拠',
      recommendationsTitle: '推奨事項',
      errorAlertTitle: '予測生成失敗',
      toast: {
        successTitle: '予測生成完了',
        successDescription: '{{skuName}}のAI在庫予測が完了しました。',
        errorTitle: '予測エラー',
        errorDescription: '予測の生成中に予期せぬエラーが発生しました。',
        skuMissingTitle: 'SKU未選択',
        skuMissingDescription: '予測を生成する前にSKUを選択してください。',
      },
    },
  },
};
