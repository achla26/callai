import HomeView from '@/modules/home/ui/views/home-view';

import { requireServerSession } from "@/utils/get-server-session";

const Page = async () => {
    await requireServerSession();
    return <HomeView />;
};

export default Page;