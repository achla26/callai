"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export const useSession = (redirectUrl = "/sign-in") => {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Use Better Auth's client-side session check
                const { data: session, error } = await authClient.getSession();

                if (error || !session) {
                    router.push(redirectUrl);
                } else {
                    setSession(session);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push(redirectUrl);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [router, redirectUrl]);

    return { session, loading };
};