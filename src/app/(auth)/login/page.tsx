// src/app/(auth)/login/page.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const loginFormSchema = z.object({
    email: z.string().email({ message: t('loginPage.emailInvalid') }),
    password: z.string().min(1, { message: t('loginPage.passwordPlaceholder') }),
  });

  type LoginFormValues = z.infer<typeof loginFormSchema>;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (values.email === 'test@alyka.io' && values.password === 'test12345') {
      localStorage.setItem('alyka-auth-status', 'authenticated');
      localStorage.setItem('alyka-user-email', values.email);
      toast({
        title: t('loginPage.loginSuccessTitle'),
        description: t('loginPage.loginSuccessDescription'),
      });
      router.push('/analytics'); 
    } else {
      toast({
        title: t('loginPage.loginErrorTitle'),
        description: t('loginPage.loginErrorDescription'),
        variant: 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">{t('loginPage.title')}</CardTitle>
        <CardDescription>{t('loginPage.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('loginPage.emailLabel')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('loginPage.emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('loginPage.passwordLabel')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('loginPage.passwordPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('loginPage.loginButton')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t('loginPage.registerLinkText')}{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            {t('loginPage.registerLinkAction')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
