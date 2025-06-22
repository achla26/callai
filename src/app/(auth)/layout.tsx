import Image from "next/image";
import { Container } from "@/components/common/Container";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="bg-green-50 min-h-screen flex items-center justify-center  p-4">
            <Container>
                <div className="flex justify-center">
                    <div className="w-full max-w-5xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-xl bg-white">
                            {/* Image Section - Hidden on mobile */}
                            <div className="hidden lg:block relative">
                                <div className="absolute inset-0 rounded-l-xl overflow-hidden">
                                    <Image
                                        src="https://images.pexels.com/photos/29968308/pexels-photo-29968308.jpeg"
                                        alt="Sign-in illustration"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50 rounded-l-xl" />
                                <div className="relative h-full p-8 flex flex-col justify-end text-white">
                                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                                    <p className="text-gray-200 mt-2">
                                        Streamline your workflow with our platform
                                    </p>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="py-8 lg:py-12">

                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}