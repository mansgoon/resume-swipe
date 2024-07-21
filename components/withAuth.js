'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(WrappedComponent, requireAuth = true) {
  return function AuthComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const isLoggedIn = document.cookie.includes('auth_token=');

        if (requireAuth && !isLoggedIn) {
          router.push('/login');
        } else if (!requireAuth && isLoggedIn) {
          router.push('/');
        } else {
          setIsLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>; // Or any loading indicator
    }

    return <WrappedComponent {...props} />;
  };
}