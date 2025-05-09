'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Add authentication check here. 
    // If authenticated, redirect to '/analytics'.
    // If not authenticated, redirect to '/login'.
    // For now, defaulting to '/login'.
    router.replace('/login');
  }, [router]);

  return null; // Or a loading spinner
}
