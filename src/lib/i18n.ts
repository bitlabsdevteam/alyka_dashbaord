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
  colorPopularity: string; 
  silhouettePopularityTitle: string; 
  silhouette: { 
    aLine: string;
    sheath: string;
    oversized: string;
    bodycon: string;
    asymmetrical: string;
  };
  patternTrendsTitle: string; 
  color: { 
    ceruleanBlue: string;
    dustyRose: string;
    oliveGreen: string;
    mustardYellow: string;
    lavender: string;
  };
  pattern: { 
    floral: string;
    geometric: string;
    stripes: string;
    polkaDots: string;
    abstract: string;
    animalPrints: string; 
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
  forecastTitle: string; 
  currentStockValueLabel: string;
  chart: {
    demandTitle: string; 
    currentLabel: string; 
    salesLabel: string; 
    currentStockLabel: string;
    yAxisDemandLabel: string; 
  };
  reasoningTitle: string;
  recommendationsTitle: string;
  errorAlertTitle: string;
  toast: {
    successTitle: string;
    successDescription: string; 
    errorTitle: string;
    errorDescription: string;
    skuMissingTitle: string;
    skuMissingDescription: string;
  };
}

interface PosSalesPageTranslations {
  title: string;
  description: string;
  totalRevenue: string;
  totalUnitsSold: string;
  averageOrderValue: string;
  comparison: {
    fromLastMonth: string;
    increasePrefix: string;
  };
  monthlySalesPerformance: string;
  salesByCategory: string;
  detailedSalesData: string;
  chart: {
    salesLabel: string;
    unitsLabel: string;
    categorySalesLabel: string;
  };
  tableHeaders: {
    monthYear: string;
    productName: string;
    category: string;
    sku: string;
    unitsSold: string;
    revenue: string;
    posName: string;
  };
  categories: {
    outerwear: string;
    tops: string;
    bottoms: string;
    dresses: string;
    accessories: string;
    footwear: string;
  };
  products: { 
    woolCoat: string; 
    silkBlouse: string; 
    denimJeans: string; 
    summerDress: string; 
    leatherBag: string; 
    sneakers: string; 
  };
  noData: string;
}

interface TasksPageTranslations {
  title: string;
  description: string;
  tableHeaders: {
    taskName: string;
    description: string;
    status: string;
    createdAt: string;
    completedAt: string;
  };
  status: {
    pending: string;
    inProgress: string;
    completed: string;
    failed: string;
  };
  tasks: {
    q3TrendReport: {
      name: string;
      description: string;
    };
    q4Sales: {
      name: string;
      description: string;
    };
    consumerSentiment: {
      name: string;
      description: string;
    };
    competitorAnalysis: {
      name: string;
      description: string;
    };
  };
  noTasks: string;
  notApplicable: string;
}


// This defines the structure of your translations
export interface Translations {
  common: CommonTranslations;
  analyticsPage: AnalyticsPageTranslations;
  header: HeaderTranslations;
  nav: NavTranslations;
  forecastPage: ForecastPageTranslations;
  posSalesPage: PosSalesPageTranslations;
  tasksPage: TasksPageTranslations;
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
      forecastTitle: 'Sales & Stock Forecast for {{skuName}}',
      currentStockValueLabel: 'Current Stock Level',
      chart: {
        demandTitle: 'Forecasted Sales Demand Over Time',
        currentLabel: 'Current',
        salesLabel: 'Forecasted Sales (Units)',
        currentStockLabel: 'Initial Stock Level',
        yAxisDemandLabel: 'Demand (Units)',
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
    posSalesPage: {
      title: 'POS Sales Data Overview',
      description: 'Visualize your Point of Sale data to understand performance and identify trends.',
      totalRevenue: 'Total Revenue',
      totalUnitsSold: 'Total Units Sold',
      averageOrderValue: 'Average Order Value',
      comparison: {
        fromLastMonth: 'from last month',
        increasePrefix: '+',
      },
      monthlySalesPerformance: 'Monthly Sales Performance',
      salesByCategory: 'Sales by Category',
      detailedSalesData: 'Detailed Sales Data',
      chart: {
        salesLabel: 'Sales ($)',
        unitsLabel: 'Units Sold',
        categorySalesLabel: "Sales ($)",
      },
      tableHeaders: {
        monthYear: 'Month/Year',
        productName: 'Product Name',
        category: 'Category',
        sku: 'SKU',
        unitsSold: 'Units Sold',
        revenue: 'Revenue ($)',
        posName: 'POS Name',
      },
      categories: {
        outerwear: 'Outerwear',
        tops: 'Tops',
        bottoms: 'Bottoms',
        dresses: 'Dresses',
        accessories: 'Accessories',
        footwear: 'Footwear',
      },
      products: {
        woolCoat: "Men's Wool Overcoat",
        silkBlouse: "Women's Silk Blouse",
        denimJeans: "Unisex Denim Jeans",
        summerDress: "Floral Summer Dress",
        leatherBag: "Leather Shoulder Bag",
        sneakers: "Limited Edition Sneakers",
      },
      noData: 'No POS data available.',
    },
    tasksPage: {
      title: 'Task Manager',
      description: 'Track the status and details of all AI-driven and manual tasks.',
      tableHeaders: {
        taskName: 'Task Name',
        description: 'Description',
        status: 'Status',
        createdAt: 'Created At',
        completedAt: 'Completed At',
      },
      status: {
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
        failed: 'Failed',
      },
      tasks: {
        q3TrendReport: {
          name: 'Generate Q3 Trend Report',
          description: 'Analyze menswear trends for Fall/Winter 2024 focusing on European market.',
        },
        q4Sales: {
          name: 'Forecast Q4 Sales',
          description: 'Based on Q3 trend report and historical data for womenswear.',
        },
        consumerSentiment: {
          name: 'Analyze Consumer Sentiment - New Collection',
          description: 'Process social media data for feedback on the new sustainable line.',
        },
        competitorAnalysis: {
          name: 'Generate Competitor Analysis Report',
          description: 'Focus on pricing and material usage of top 5 competitors.',
        },
      },
      noTasks: 'No tasks found.',
      notApplicable: 'N/A',
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
      forecastTitle: '{{skuName}}の販売と在庫予測',
      currentStockValueLabel: '現在の在庫レベル',
      chart: {
        demandTitle: '予測販売需要の推移',
        currentLabel: '現在',
        salesLabel: '予測販売数（ユニット）',
        currentStockLabel: '初期在庫レベル',
        yAxisDemandLabel: '需要（ユニット）',
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
    posSalesPage: {
      title: 'POS販売データ概要',
      description: 'POSデータを視覚化し、パフォーマンスを理解し、トレンドを特定します。',
      totalRevenue: '総収益',
      totalUnitsSold: '総販売ユニット数',
      averageOrderValue: '平均注文額',
      comparison: {
        fromLastMonth: '前月比',
        increasePrefix: '+',
      },
      monthlySalesPerformance: '月次販売実績',
      salesByCategory: 'カテゴリ別売上',
      detailedSalesData: '詳細販売データ',
      chart: {
        salesLabel: '売上 ($)',
        unitsLabel: '販売ユニット数',
        categorySalesLabel: "売上 ($)",
      },
      tableHeaders: {
        monthYear: '年月',
        productName: '製品名',
        category: 'カテゴリ',
        sku: 'SKU',
        unitsSold: '販売ユニット数',
        revenue: '収益 ($)',
        posName: 'POS名',
      },
      categories: {
        outerwear: 'アウターウェア',
        tops: 'トップス',
        bottoms: 'ボトムス',
        dresses: 'ドレス',
        accessories: 'アクセサリー',
        footwear: 'フットウェア',
      },
      products: {
        woolCoat: "メンズウールオーバーコート",
        silkBlouse: "レディースシルクブラウス",
        denimJeans: "ユニセックスデニムジーンズ",
        summerDress: "フローラルサマードレス",
        leatherBag: "レザーショルダーバッグ",
        sneakers: "限定版スニーカー",
      },
      noData: 'POSデータがありません。',
    },
    tasksPage: {
      title: 'タスク管理',
      description: 'AI駆動および手動タスクのステータスと詳細を追跡します。',
      tableHeaders: {
        taskName: 'タスク名',
        description: '説明',
        status: 'ステータス',
        createdAt: '作成日時',
        completedAt: '完了日時',
      },
      status: {
        pending: '保留中',
        inProgress: '進行中',
        completed: '完了',
        failed: '失敗',
      },
      tasks: {
        q3TrendReport: {
          name: 'Q3トレンドレポート生成',
          description: '2024年秋冬メンズウェアトレンドを分析（ヨーロッパ市場中心）。',
        },
        q4Sales: {
          name: 'Q4売上予測',
          description: 'Q3トレンドレポートとレディースウェアの過去データに基づく。',
        },
        consumerSentiment: {
          name: '消費者センチメント分析 - 新コレクション',
          description: '新しいサステナブルラインのフィードバックのためソーシャルメディアデータを処理。',
        },
        competitorAnalysis: {
          name: '競合分析レポート生成',
          description: '上位5社の競合他社の価格設定と素材使用に焦点を当てる。',
        },
      },
      noTasks: 'タスクが見つかりません。',
      notApplicable: '該当なし',
    },
  },
};

