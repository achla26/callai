"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const useRequireAuth = (redirectUrl = "/sign-in") => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const session = await auth.api.getSession({
                    headers: await headers(),
                });
                if (!session) {
                    router.push(redirectUrl);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push(redirectUrl);
            }
        };

        checkAuth();
    }, [router, redirectUrl]);

    return null;
};