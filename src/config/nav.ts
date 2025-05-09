import type { LucideIcon } from 'lucide-react';
import { LineChart, TrendingUp, ShoppingCart, ListChecks } from 'lucide-react'; // Removed Settings icon

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const navItems: NavItem[] = [
  {
    title: 'Analytics',
    href: '/analytics',
    icon: LineChart,
  },
  {
    title: 'Forecast',
    href: '/forecast',
    icon: TrendingUp,
  },
  {
    title: 'POS Sales', // Key for translation will be 'nav.posSales'
    href: '/pos-sales',
    icon: ShoppingCart,
  },
  {
    title: 'Task Manager', // Key for translation will be 'nav.taskManager'
    href: '/tasks',
    icon: ListChecks,
  },
  // { // Removed Settings
  //   title: 'Settings',
  //   href: '/settings',
  //   icon: Settings,
  // },
];
