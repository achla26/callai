import SignInView from '@/modules/auth/ui/views/sign-in-view'
import { authRedirect } from "@/utils/get-server-session";

const page = async () => {
    await authRedirect();
    return <SignInView />
}

export default page
