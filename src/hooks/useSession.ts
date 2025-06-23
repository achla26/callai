"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';

export const useSession = (redirectUrl = "/sign-in") => {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Client-side session check only
                const session = await auth.api.getSession();

                if (!session) {
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