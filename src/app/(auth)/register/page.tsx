// src/app/(auth)/register/page.tsx
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
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-context';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const registerFormSchema = z.object({
    username: z.string().min(3, { message: t('registerPage.usernamePlaceholder') }), // Adjusted min length for username
    password: z.string().min(6, { message: t('registerPage.passwordPlaceholder') }), // Adjusted min length for password
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: t('registerPage.passwordMismatch'),
    path: ['confirmPassword'],
  });

  type RegisterFormValues = z.infer<typeof registerFormSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate successful registration
    toast({
      title: t('registerPage.registrationSuccessTitle'),
      description: t('registerPage.registrationSuccessDescription'),
    });
    router.push('/login'); // Redirect to login page after successful registration
    
    // Simulate error (e.g. username taken)
    // toast({
    //   title: t('registerPage.registrationErrorTitle'),
    //   description: "Username already taken.", // Example specific error
    //   variant: 'destructive',
    // });

    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">{t('registerPage.title')}</CardTitle>
        <CardDescription>{t('registerPage.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('registerPage.usernameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('registerPage.usernamePlaceholder')} {...field} />
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
                  <FormLabel>{t('registerPage.passwordLabel')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('registerPage.passwordPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('registerPage.confirmPasswordLabel')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('registerPage.confirmPasswordPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('registerPage.registerButton')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {t('registerPage.loginLinkText')}{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            {t('registerPage.loginLinkAction')}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
