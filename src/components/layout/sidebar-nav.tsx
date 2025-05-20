
// src/components/layout/sidebar-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems as originalNavItems, type NavItem } from '@/config/nav';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { useLanguage } from '@/context/language-context'; 
import type { TranslationKey } from '@/lib/i18n';

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useLanguage(); 

  const navItems: NavItem[] = originalNavItems.map(item => {
    let translationKey: TranslationKey;
    switch (item.title.toLowerCase()) {
      case 'analytics':
        translationKey = 'nav.analytics';
        break;
      case 'forecast':
        translationKey = 'nav.forecast';
        break;
      case 'stores': 
        translationKey = 'nav.stores'; 
        break;
      case 'tasks manager':
        translationKey = 'nav.tasksManager';
        break;
      case 'reports':
        translationKey = 'nav.reports';
        break;
      case 'data input': 
        translationKey = 'nav.dataInput';
        break;
      default:
        translationKey = `nav.${item.title.toLowerCase().replace(/\s+/g, '')}` as TranslationKey;
    }
    return {
      ...item,
      title: t(translationKey) || item.title, 
    };
  });


  return (
    <div className="flex flex-col h-full">
      <SidebarGroupLabel className="flex items-center gap-2">
        <Icons.Logo className="w-6 h-6 text-primary" />
        <span className="text-lg font-semibold">Alyka</span>
      </SidebarGroupLabel>
      <SidebarMenu className="mt-4">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-sidebar-accent text-sidebar-accent-foreground',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
                isActive={pathname === item.href}
                tooltip={{ content: item.title, side: 'right', align: 'center' }}
                disabled={item.disabled}
              >
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}

