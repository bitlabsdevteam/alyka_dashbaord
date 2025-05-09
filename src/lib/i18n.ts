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
}

interface HeaderTranslations {
  userMenu: {
    label: string;
    greeting: string; // e.g. Analyst User
    email: string; // e.g. analyst@alyka.ai
  }
}

interface NavTranslations {
  analytics: string;
  forecast: string;
  posSales: string;
  taskManager: string;
  settings: string;
}


// This defines the structure of your translations
export interface Translations {
  common: CommonTranslations;
  analyticsPage: AnalyticsPageTranslations;
  header: HeaderTranslations;
  nav: NavTranslations;
  // Add other pages/components here
  // forecastPage: { ... }
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
      settings: 'Settings',
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
      colorPopularity: 'Popularity'
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
      settings: '設定',
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
      colorPopularity: '人気度'
    },
  },
};
