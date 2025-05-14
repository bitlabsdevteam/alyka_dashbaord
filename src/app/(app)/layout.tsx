// src/app/(app)/layout.tsx
'use client'; 

import type { PropsWithChildren } from 'react';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarFooter
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { LogOut, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { ChatbotDialog } from '@/components/chatbot/chatbot-dialog';
import { useToast } from '@/hooks/use-toast';

export default function AppLayout({ children }: PropsWithChildren) {
  const { t } = useLanguage(); 
  const router = useRouter();
  const { toast } = useToast();
  const [isChatbotOpen, setIsChatbotOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('alyka-auth-status');
    localStorage.removeItem('alyka-user-email');
    toast({
      title: t('header.userMenu.logoutSuccessTitle'), // Assuming these translations exist or will be added
      description: t('header.userMenu.logoutSuccessDescription'),
    });
    router.push('/login');
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          {/* SidebarNav includes the logo and title */}
        </SidebarHeader>
        <SidebarContent className="p-0">
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setIsChatbotOpen(true)}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            <span>{t('common.support')}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>{t('common.logout')}</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
      <ChatbotDialog isOpen={isChatbotOpen} onOpenChange={setIsChatbotOpen} />
    </SidebarProvider>
  );
}
