import SignInView from '@/modules/auth/ui/views/sign-in-view'

const page = () => {
    console.log("sign in page")
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <SignInView />
        </main>
    )
}

export default page
