'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/components/LoadingSpinner';

export function withAuth(WrappedComponent, requireAuth = true) {
  return function AuthComponent(props) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (status === 'loading') return; // Wait for the session to be checked

      if (requireAuth && !session) {
        router.push('/login');
      } else if (!requireAuth && session) {
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }, [session, status, router]);

    if (isLoading || status === 'loading') {
      return <LoadingSpinner />;
    }

    return <WrappedComponent {...props} />;
  };
}