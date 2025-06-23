import { requireAuth } from '@/utils/get-server-session';

export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    await requireAuth();
    return <>{children}</>;
}
