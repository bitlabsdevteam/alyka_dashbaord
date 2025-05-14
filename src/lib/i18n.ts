// src/lib/i18n.ts

export type Locale = 'en' | 'ja';

interface CommonTranslations {
  language: string;
  english: string;
  japanese: string;
  profile: string;
  logout: string;
  chat: string;
  settings: string;
  saving: string;
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
    deepSapphire: string;
    desertKhaki: string;
    richBurgundy: string;
    forestGreen: string;
    warmTerracotta: string;
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
    defaultGreeting: string;
    testUserGreeting: string;
    avatarAlt: string;
    logoutSuccessTitle: string;
    logoutSuccessDescription: string;
  }
}

interface NavTranslations {
  analytics: string;
  forecast: string;
  posSales: string;
  tasksManager: string;
  reports: string;
  dataInput: string;
}

interface ForecastPageTranslations {
  selectSkuTitle: string;
  selectSkuDescription: string;
  skuLabel: string;
  selectSkuPlaceholder: string;
  currentStockLabel: string;
  forecastHorizonLabel: string;
  forecastHorizonValueDisplay: string;
  groundVoiceLabel: string; 
  yourVoiceCountPlaceholder: string;
  yourVoiceCountDescription: string;
  generateButton: string;
  generatingButton: string;
  forecastTitle: string;
  currentStockValueLabel: string;
  chart: {
    demandTitle: string;
    currentLabel: string;
    salesLabel: string;
    currentStockLabel: string;
    yAxisUnitsLabel: string;
    stockLabel: string;
    initialPeriodLabel: string;
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
  skus: {
    classicWhiteTShirt: string;
    skinnyBlueJeans: string;
    oversizedHoodieBlack: string;
    stripedCottonPJs: string;
    luxurySilkScarfFloral: string;
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
    po: string; 
    posName: string;
  };
  buttons: { 
    createPo: string;
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

interface ChatbotTranslations {
  title: string;
  description: string;
  greeting: string;
  inputPlaceholder: string;
  sendButton: string;
  simulatedResponse: string;
}

interface LoginPageTranslations {
  title: string;
  description: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailInvalid: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  loginButton: string;
  registerLinkText: string;
  registerLinkAction: string;
  loginSuccessTitle: string;
  loginSuccessDescription: string;
  loginErrorTitle: string;
  loginErrorDescription: string;
}

interface RegisterPageTranslations {
  title: string;
  description: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  registerButton: string;
  loginLinkText: string;
  loginLinkAction: string;
  passwordMismatch: string;
  registrationSuccessTitle: string;
  registrationSuccessDescription: string;
  registrationErrorTitle: string;
  registrationErrorDescription: string;
}

interface SettingsPageTranslations {
  title: string;
  description: string;
  paymentMethod: {
    title: string;
    description: string;
    currentMethod: string;
    cardNumberEndingIn: string;
    noPaymentMethod: string;
    updateButton: string;
    billingHistoryButton: string;
  };
  mcpConfig: {
    title: string;
    description: string;
    serverAddressLabel: string;
    serverAddressPlaceholder: string;
    portLabel: string;
    portPlaceholder: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    enableMcpLabel: string;
    saveButton: string;
    testConnectionButton: string;
    toast: {
      saveSuccessTitle: string;
      saveSuccessDescription: string;
      saveErrorTitle: string;
      saveErrorDescription: string;
    }
  };
   posIntegration: {
    title: string;
    description: string;
    enableIntegrationLabel: string;
    posSystemLabel: string;
    selectPosSystemPlaceholder: string;
    squarePos: string;
    shopifyPos: string;
    cloverPos: string;
    otherPos: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    apiKeyDescription: string;
    uploadDataLabel: string;
    uploadDataDescription: string;
    saveButton: string;
    testConnectionButton: string;
    toast: {
      saveSuccessTitle: string;
      saveSuccessDescription: string;
      saveErrorTitle: string;
      saveErrorDescription: string;
      connectionSuccessTitle: string;
      connectionSuccessDescription: string;
      connectionErrorTitle: string;
      connectionErrorDescription: string;
    };
  };
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
  chatbot: ChatbotTranslations;
  loginPage: LoginPageTranslations;
  registerPage: RegisterPageTranslations;
  settingsPage: SettingsPageTranslations;
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
      chat: 'Chat',
      settings: 'Settings',
      saving: 'Saving...',
    },
    header: {
      userMenu: {
        label: 'User Menu',
        greeting: 'Analyst User',
        email: 'analyst@alyka.ai',
        defaultGreeting: 'User',
        testUserGreeting: 'Test User',
        avatarAlt: 'User avatar',
        logoutSuccessTitle: 'Logged Out',
        logoutSuccessDescription: 'You have been successfully logged out.',
      }
    },
    nav: {
      analytics: 'Analytics',
      forecast: 'Forecast',
      posSales: 'POS Sales',
      tasksManager: 'Tasks Manager',
      reports: 'Reports',
      dataInput: 'Data Input',
    },
    analyticsPage: {
      latestTrendTitle: 'Latest Trend Updates',
      latestTrendDescription: 'Insights from recent fashion events and runway shows.',
      galaArticle: {
        title: 'Tokyo Fashion Week: Spotlight on Emerging Trends',
        paragraph1: "This week's Tokyo Fashion Week is causing a stir, with several key trends poised to spike. Keep an eye on Deep Sapphire for its bold statements, Stripes making a resurgence in unexpected ways, and the continued dominance of Oversized silhouettes in contemporary designs.",
        paragraph2: 'Industry insiders are buzzing about how these emerging styles from Tokyo will influence upcoming B2B apparel collections globally. Retailers should monitor these developments closely.',
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
        deepSapphire: 'Deep Sapphire',
        desertKhaki: 'Desert Khaki',
        richBurgundy: 'Rich Burgundy',
        forestGreen: 'Forest Green',
        warmTerracotta: 'Warm Terracotta',
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
      forecastHorizonValueDisplay: 'Next {{count}} months',
      groundVoiceLabel: 'Ground Voice',
      yourVoiceCountPlaceholder: 'Enter your feedback or specific insights for this forecast (e.g., "Expecting high demand due to recent celebrity endorsement", "Local event might boost sales for this item next month").',
      yourVoiceCountDescription: 'Your feedback will help us to learn better.',
      generateButton: 'Generate Forecast',
      generatingButton: 'Generating Forecast...',
      forecastTitle: 'Sales & Stock Forecast for {{skuName}}',
      currentStockValueLabel: 'Current Stock Level',
      chart: {
        demandTitle: 'Forecasted Sales Demand Over Time',
        currentLabel: 'Current',
        salesLabel: 'Forecasted Sales (Units)',
        currentStockLabel: 'Initial Stock Level',
        yAxisUnitsLabel: 'Units',
        stockLabel: 'Forecasted Stock (Units)',
        initialPeriodLabel: 'Initial',
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
      skus: {
        classicWhiteTShirt: "Men's Classic White T-Shirt",
        skinnyBlueJeans: "Women's Skinny Blue Jeans",
        oversizedHoodieBlack: "Unisex Oversized Hoodie - Black",
        stripedCottonPJs: "Children's Striped Cotton PJs",
        luxurySilkScarfFloral: "Luxury Silk Scarf - Floral Print",
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
        po: 'PO',
        posName: 'POS Name',
      },
      buttons: {
        createPo: 'Create PO',
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
      title: 'Tasks Manager',
      description: 'Track the status and details of all AI-driven tasks.',
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
    chatbot: {
      title: 'Alyka Chat Support',
      description: 'Ask me anything about fashion trends, sales data, or forecasts!',
      greeting: 'Hello! I am Alyka, your AI fashion assistant. How can I help you today?',
      inputPlaceholder: 'Type your message...',
      sendButton: 'Send',
      simulatedResponse: "Thanks for your message! I'm processing your request. For now, here's a general tip: Keep an eye on sustainable fabrics, as they are a growing trend!",
    },
    loginPage: {
      title: 'Login',
      description: 'Access your AI-powered fashion analytics dashboard.',
      usernameLabel: 'Username (Legacy)',
      usernamePlaceholder: 'Enter your username (Legacy)',
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      emailInvalid: 'Please enter a valid email address.',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Login',
      registerLinkText: "Don't have an account?",
      registerLinkAction: 'Register here',
      loginSuccessTitle: 'Login Successful',
      loginSuccessDescription: 'Welcome back to Alyka!',
      loginErrorTitle: 'Login Failed',
      loginErrorDescription: 'Invalid email or password. Please try again.',
    },
    registerPage: {
      title: 'Create your Alyka Account',
      description: 'Join Alyka to unlock powerful fashion insights.',
      usernameLabel: 'Username',
      usernamePlaceholder: 'Choose a username',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Create a strong password (min. 6 characters)',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      registerButton: 'Register',
      loginLinkText: 'Already have an account?',
      loginLinkAction: 'Login here',
      passwordMismatch: 'Passwords do not match.',
      registrationSuccessTitle: 'Registration Successful',
      registrationSuccessDescription: 'Your Alyka account has been created. Please login.',
      registrationErrorTitle: 'Registration Failed',
      registrationErrorDescription: 'Could not create your account. Please try again.',
    },
    settingsPage: {
      title: 'Settings',
      description: 'Manage your account preferences and configurations.',
      paymentMethod: {
        title: 'Payment Method',
        description: 'Manage your billing information and payment methods.',
        currentMethod: 'Current Payment Method:',
        cardNumberEndingIn: 'Visa ending in **** 1234',
        noPaymentMethod: 'No payment method on file.',
        updateButton: 'Update Payment Method',
        billingHistoryButton: 'View Billing History',
      },
      mcpConfig: {
        title: 'MCP Server Configuration',
        description: 'Configure the Model Context Protocol server settings.',
        serverAddressLabel: 'Server Address',
        serverAddressPlaceholder: 'e.g., https://mcp.example.com',
        portLabel: 'Port',
        portPlaceholder: 'e.g., 443',
        apiKeyLabel: 'API Key',
        apiKeyPlaceholder: 'Enter your MCP API Key',
        enableMcpLabel: 'Enable MCP Integration',
        saveButton: 'Save Configuration',
        testConnectionButton: 'Test Connection',
        toast: {
          saveSuccessTitle: 'Configuration Saved',
          saveSuccessDescription: 'MCP server settings updated successfully.',
          saveErrorTitle: 'Save Failed',
          saveErrorDescription: 'Could not save MCP server settings.',
        }
      },
      posIntegration: {
        title: 'POS Integration',
        description: 'Connect your Point of Sale system to automatically import sales data.',
        enableIntegrationLabel: 'Enable POS Integration',
        posSystemLabel: 'Select your POS System',
        selectPosSystemPlaceholder: 'Choose a POS System',
        squarePos: 'Square',
        shopifyPos: 'Shopify',
        cloverPos: 'Clover',
        otherPos: 'Other (Manual Upload)',
        apiKeyLabel: 'API Key',
        apiKeyPlaceholder: 'Enter API Key',
        apiKeyDescription: 'You can find your API key in your POS system settings.',
        uploadDataLabel: 'Upload POS Data',
        uploadDataDescription: 'Upload a .CSV or .XLSX file containing your sales data.',
        saveButton: 'Save Integration Settings',
        testConnectionButton: 'Test Connection',
        toast: {
          saveSuccessTitle: 'POS Settings Saved',
          saveSuccessDescription: 'Your POS integration settings have been updated.',
          saveErrorTitle: 'Error Saving Settings',
          saveErrorDescription: 'There was an error saving your POS integration settings.',
          connectionSuccessTitle: 'Connection Successful',
          connectionSuccessDescription: 'Successfully connected to your POS system.',
          connectionErrorTitle: 'Connection Error',
          connectionErrorDescription: 'Could not connect to your POS system. Check your API key and try again.',
        },
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
      chat: 'チャット',
      settings: '設定',
      saving: '保存中...',
    },
    header: {
      userMenu: {
        label: 'ユーザーメニュー',
        greeting: 'アナリストユーザー',
        email: 'analyst@alyka.ai',
        defaultGreeting: 'ユーザー',
        testUserGreeting: 'テストユーザー',
        avatarAlt: 'ユーザーアバター',
        logoutSuccessTitle: 'ログアウトしました',
        logoutSuccessDescription: '正常にログアウトされました。',
      }
    },
    nav: {
      analytics: '分析',
      forecast: '予測',
      posSales: 'POS販売',
      tasksManager: 'タスク管理',
      reports: 'レポート',
      dataInput: 'データ入力',
    },
    analyticsPage: {
      latestTrendTitle: '最新トレンドアップデート',
      latestTrendDescription: '最近のファッションイベントやランウェイショーからの洞察。',
      galaArticle: {
        title: '東京ファッションウィーク：注目トレンドスポットライト',
        paragraph1: '今週の東京ファッションウィークは話題を呼んでおり、いくつかの主要トレンドが急上昇する見込みです。大胆な主張が際立つディープサファイア、予想外の方法で再登場するストライプ、そして現代デザインにおけるオーバーサイズシルエットの継続的な優位性に注目してください。',
        paragraph2: '業界関係者は、東京発のこれらの新しいスタイルが、世界中の今後のB2Bアパレルコレクションにどのような影響を与えるかについて話題にしています。小売業者はこれらの動向を注意深く監視する必要があります。',
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
        deepSapphire: 'ディープサファイア',
        desertKhaki: 'デザートカーキ',
        richBurgundy: 'リッチバーガンディ',
        forestGreen: 'フォレストグリーン',
        warmTerracotta: 'ウォームテラコッタ',
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
      forecastHorizonValueDisplay: '今後 {{count}} か月',
      groundVoiceLabel: '現場の声', 
      yourVoiceCountPlaceholder: 'この予測に関するフィードバックや特定の洞察を入力してください（例：「最近の有名人の推薦により高い需要が見込まれる」、「来月、地元のイベントがこの商品の売上を押し上げる可能性がある」）。',
      yourVoiceCountDescription: 'あなたのフィードバックは、私たちがより良く学ぶのに役立ちます。',
      generateButton: '予測を生成',
      generatingButton: '予測を生成中...',
      forecastTitle: '{{skuName}}の販売と在庫予測',
      currentStockValueLabel: '現在の在庫レベル',
      chart: {
        demandTitle: '予測販売需要の推移',
        currentLabel: '現在',
        salesLabel: '予測販売数（ユニット）',
        currentStockLabel: '初期在庫レベル',
        yAxisUnitsLabel: 'ユニット',
        stockLabel: '予測在庫数（ユニット）',
        initialPeriodLabel: '初期',
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
      skus: {
        classicWhiteTShirt: "メンズ クラシックホワイトTシャツ",
        skinnyBlueJeans: "レディース スキニーブルージーンズ",
        oversizedHoodieBlack: "ユニセックス オーバーサイズパーカー - ブラック",
        stripedCottonPJs: "子供用 ストライプコットンパジャマ",
        luxurySilkScarfFloral: "高級シルクスカーフ - フローラルプリント",
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
        salesLabel: '売上 (¥)',
        unitsLabel: '販売ユニット数',
        categorySalesLabel: "売上 (¥)",
      },
      tableHeaders: {
        monthYear: '年月',
        productName: '製品名',
        category: 'カテゴリ',
        sku: 'SKU',
        unitsSold: '販売ユニット数',
        revenue: '収益 (¥)',
        po: '発注書',
        posName: 'POS名',
      },
      buttons: {
        createPo: '発注書作成',
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
      description: 'AI駆動タスクのステータスと詳細を追跡します。',
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
    chatbot: {
      title: 'Alykaチャットサポート',
      description: 'ファッショントレンド、販売データ、予測について何でも聞いてください！',
      greeting: 'こんにちは！私はあなたのAIファッションアシスタント、Alykaです。今日はどうしましたか？',
      inputPlaceholder: 'メッセージを入力してください...',
      sendButton: '送信',
      simulatedResponse: 'メッセージありがとうございます！リクエストを処理中です。今のところ、一般的なヒントです：サステナブルな生地に注目してください、成長しているトレンドです！',
    },
    loginPage: {
      title: 'ログイン',
      description: 'AI搭載のファッション分析ダッシュボードにアクセスします。',
      usernameLabel: 'ユーザー名（旧）',
      usernamePlaceholder: 'ユーザー名を入力してください（旧）',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'メールアドレスを入力してください',
      emailInvalid: '有効なメールアドレスを入力してください。',
      passwordLabel: 'パスワード',
      passwordPlaceholder: 'パスワードを入力してください',
      loginButton: 'ログイン',
      registerLinkText: 'アカウントをお持ちではありませんか？',
      registerLinkAction: 'こちらで登録',
      loginSuccessTitle: 'ログイン成功',
      loginSuccessDescription: 'Alykaへようこそ！',
      loginErrorTitle: 'ログイン失敗',
      loginErrorDescription: 'メールアドレスまたはパスワードが無効です。もう一度お試しください。',
    },
    registerPage: {
      title: 'Alykaアカウントを作成',
      description: 'Alykaに参加して、強力なファッションインサイトを手に入れましょう。',
      usernameLabel: 'ユーザー名',
      usernamePlaceholder: 'ユーザー名を選択してください',
      passwordLabel: 'パスワード',
      passwordPlaceholder: '強力なパスワードを作成してください（最低6文字）',
      confirmPasswordLabel: 'パスワードを確認',
      confirmPasswordPlaceholder: 'パスワードを再入力してください',
      registerButton: '登録',
      loginLinkText: 'すでにアカウントをお持ちですか？',
      loginLinkAction: 'こちらでログイン',
      passwordMismatch: 'パスワードが一致しません。',
      registrationSuccessTitle: '登録成功',
      registrationSuccessDescription: 'Alykaアカウントが作成されました。ログインしてください。',
      registrationErrorTitle: '登録失敗',
      registrationErrorDescription: 'アカウントを作成できませんでした。もう一度お試しください。',
    },
    settingsPage: {
      title: '設定',
      description: 'アカウント設定と構成を管理します。',
      paymentMethod: {
        title: '支払い方法',
        description: '請求情報と支払い方法を管理します。',
        currentMethod: '現在の支払い方法：',
        cardNumberEndingIn: 'Visa カード番号末尾 **** 1234',
        noPaymentMethod: '登録されている支払い方法がありません。',
        updateButton: '支払い方法を更新',
        billingHistoryButton: '請求履歴を表示',
      },
      mcpConfig: {
        title: 'MCPサーバー構成',
        description: 'モデルコンテキストプロトコルサーバーの設定を構成します。',
        serverAddressLabel: 'サーバーアドレス',
        serverAddressPlaceholder: '例：https://mcp.example.com',
        portLabel: 'ポート',
        portPlaceholder: '例：443',
        apiKeyLabel: 'APIキー',
        apiKeyPlaceholder: 'MCP APIキーを入力してください',
        enableMcpLabel: 'MCP統合を有効にする',
        saveButton: '構成を保存',
        testConnectionButton: '接続テスト',
        toast: {
          saveSuccessTitle: '構成が保存されました',
          saveSuccessDescription: 'MCPサーバー設定が正常に更新されました。',
          saveErrorTitle: '保存に失敗しました',
          saveErrorDescription: 'MCPサーバー設定を保存できませんでした。',
        }
      },
      posIntegration: {
        title: 'POS統合',
        description: 'POSシステムを接続して、販売データを自動的にインポートします。',
        enableIntegrationLabel: 'POS統合を有効にする',
        posSystemLabel: 'POSシステムを選択してください',
        selectPosSystemPlaceholder: 'POSシステムを選択',
        squarePos: 'Square',
        shopifyPos: 'Shopify',
        cloverPos: 'Clover',
        otherPos: 'その他（手動アップロード）',
        apiKeyLabel: 'APIキー',
        apiKeyPlaceholder: 'APIキーを入力',
        apiKeyDescription: 'APIキーはPOSシステムの設定で見つけることができます。',
        uploadDataLabel: 'POSデータをアップロード',
        uploadDataDescription: '販売データを含む.CSVまたは.XLSXファイルをアップロードします。',
        saveButton: '統合設定を保存',
        testConnectionButton: '接続テスト',
        toast: {
          saveSuccessTitle: 'POS設定が保存されました',
          saveSuccessDescription: 'POS統合設定が更新されました。',
          saveErrorTitle: '設定保存エラー',
          saveErrorDescription: 'POS統合設定の保存中にエラーが発生しました。',
          connectionSuccessTitle: '接続成功',
          connectionSuccessDescription: 'POSシステムへの接続に成功しました。',
          connectionErrorTitle: '接続エラー',
          connectionErrorDescription: 'POSシステムに接続できませんでした。APIキーを確認して再試行してください。',
        },
      },
    },
  },
};

