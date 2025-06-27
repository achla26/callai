import HomeView from '@/modules/home/ui/views/home-view';
import { caller } from '@/trpc/server';
const Page = async () => {
    const data = await caller.hello({ text: 'server' });

    return <>{data.greeting}</>
    return <HomeView />;
};

export default Page;