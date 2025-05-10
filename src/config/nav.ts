import type { LucideIcon } from 'lucide-react';
import { LineChart, TrendingUp, ShoppingCart, ListChecks, FileText, MessageCircleQuestion } from 'lucide-react'; 

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
    title: 'POS Sales', 
    href: '/pos-sales',
    icon: ShoppingCart,
  },
  {
    title: 'Tasks Manager', 
    href: '/tasks',
    icon: ListChecks,
  },
  {
    title: 'Reports', 
    href: '/reports', 
    icon: FileText, 
    disabled: false, 
  },
  {
    title: 'Feedback',
    href: '/feedback',
    icon: MessageCircleQuestion,
  }
];
