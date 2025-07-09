import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Reads the session on the **server**.
 * Returns the session object or `null`.
 */
export async function getServerSession() {
    // `headers()` is synchronous – no need to `await` it
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session ?? null;
}

/**
 * Convenience helper: call inside any Server Component / route
 * to force-redirect unauthenticated users.
 */
export async function requireServerSession() {
    const session = await getServerSession();
    if (!session) {
        redirect("/sign-in");
    }
    return session;
}

export async function authRedirect() {
    const session = await getServerSession();

    if (!!session) {
        redirect('/home');
    }
    return session;
}


export const requireAuth = async (redirectUrl = "/sign-in") => {
    const session = await getServerSession();

    if (!session) {
        redirect(redirectUrl);
    }

    return session;
};