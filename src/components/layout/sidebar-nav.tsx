'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems, type NavItem } from '@/config/nav';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';

export function SidebarNav() {
  const pathname = usePathname();

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
