'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status from localStorage
    const isAuthenticated = localStorage.getItem('alyka-auth-status') === 'authenticated';

    if (isAuthenticated) {
      router.replace('/analytics');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null; // Or a loading spinner while redirecting
}
