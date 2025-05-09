// src/components/layout/header.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut, User, Languages } from 'lucide-react'; 
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useLanguage } from '@/context/language-context'; 
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const { language, setLanguage, t } = useLanguage(); 
  const router = useRouter();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = React.useState<string | null>(null);
  const [userName, setUserName] = React.useState<string>(t('header.userMenu.defaultGreeting'));


  React.useEffect(() => {
    const storedEmail = localStorage.getItem('alyka-user-email');
    if (storedEmail) {
      setUserEmail(storedEmail);
      if (storedEmail === 'test@alyka.io') {
        setUserName(t('header.userMenu.testUserGreeting'));
      } else {
         setUserName(t('header.userMenu.defaultGreeting'));
      }
    } else {
      setUserName(t('header.userMenu.defaultGreeting'));
    }
  }, [t, language]); // Rerun if language changes for t function

  const handleLogout = () => {
    localStorage.removeItem('alyka-auth-status');
    localStorage.removeItem('alyka-user-email');
    toast({
      title: t('header.userMenu.logoutSuccessTitle'),
      description: t('header.userMenu.logoutSuccessDescription'),
    });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex-1 md:hidden"></div> {/* Spacer for mobile */}
        <div className="hidden md:flex"></div> {/* Placeholder for potential future elements */}
        
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/100/100" alt={t('header.userMenu.avatarAlt')} data-ai-hint="person face" />
                  <AvatarFallback>{userName ? userName.charAt(0).toUpperCase() : 'A'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  {userEmail && <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{t('common.profile')}</span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Languages className="mr-2 h-4 w-4" />
                  <span>{t('common.language')}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ja')}>
                    <DropdownMenuRadioItem value="en">{t('common.english')}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ja">{t('common.japanese')}</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('common.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
