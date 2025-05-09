import type { LucideIcon } from 'lucide-react';
import { LineChart, TrendingUp, ShoppingCart, ListChecks, FileText } from 'lucide-react'; 

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
    title: 'Tasks Manager', // Key for translation will be 'nav.tasksManager'
    href: '/tasks',
    icon: ListChecks,
  },
  {
    title: 'Reports', // Key for translation will be 'nav.reports'
    href: '/reports', // Assuming a /reports route, can be changed
    icon: FileText, 
    disabled: true, // Placeholder, enable when page is ready
  },
];
