// src/app/(auth)/layout.tsx
import type { PropsWithChildren } from 'react';
import { Icons } from '@/components/icons';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-semibold text-primary">
        <Icons.Logo className="h-8 w-8" />
        <span>Alyka</span>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
