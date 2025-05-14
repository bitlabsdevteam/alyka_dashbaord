import type { LucideIcon } from 'lucide-react';
import { LineChart, TrendingUp, Store, ListChecks } from 'lucide-react'; 

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
    title: 'Stores', 
    href: '/pos-sales',
    icon: Store,
  },
  {
    title: 'Tasks Manager', 
    href: '/tasks',
    icon: ListChecks,
  },
];

