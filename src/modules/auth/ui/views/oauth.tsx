"use client";

import { Button } from "@/components/ui/button";
import { Icons } from '@/components/common/Icons';


interface OAuthProps {
    isLoading: boolean;
    oauthLoading?: "google" | "github";
    onOAuthAction: (provider: "google" | "github") => void;
}

const OAuth = ({ isLoading, oauthLoading, onOAuthAction }: OAuthProps) => {
    return (
        <>
            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-6">
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => onOAuthAction("google")}
                    disabled={isLoading || oauthLoading === "google"}
                    className="w-full border-gray-300 "
                >
                    {oauthLoading === "google" ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                    )}Google
                </Button>
                <Button
                    variant="outline"
                    type="button"
                    onClick={() => onOAuthAction("github")}
                    disabled={isLoading || oauthLoading === "github"} className="border-gray-300 "
                >
                    {oauthLoading === "github" ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}
                    Github
                </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 text-muted">
                        Or continue with
                    </span>
                </div>
            </div>
        </>
    );
};

export default OAuth;