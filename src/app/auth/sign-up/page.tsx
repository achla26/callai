import SignUpView from '@/modules/auth/ui/views/sign-up-view'

const Page = () => {
    console.log("sign up Page")
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <SignUpView />
        </main>
    )
}

export default Page
