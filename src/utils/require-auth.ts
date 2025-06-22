import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const requireAuth = async (redirectUrl = "/sign-in") => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect(redirectUrl);
    }

    return session;
};