"use client";

import { authClient } from "@/lib/auth-client";

const HomeView = () => {

    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <div className='flex flex-col p-4 gap-y-4'>
            <p>Logged in as {session.user.name}</p>
            <button onClick={() => authClient.signOut()}>Sign Out</button>
        </div>
    );
};

export default HomeView;