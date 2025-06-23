"use client";
import { useSession } from '@/hooks/useSession';
import HomeView from '@/modules/home/ui/views/home-view';

export default function ProtectedPage() {
    const { session, loading } = useSession();

    if (loading) return <div>Loading...</div>;
    return <HomeView />

}