"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LoginSchema } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormButton } from "@/components/form/FormButton";
import { FormError, FormSuccess } from "@/components/form/FormAlert";

import { Eye, EyeOff } from "lucide-react";
import OAuth from "@/modules/auth/ui/views/oauth";

import { useRouter } from "next/navigation";

type FormData = z.infer<typeof LoginSchema>;

const SignInView = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<{
        loading: boolean;
        error?: string;
        success?: string;
        oauthLoading?: "google" | "github";
    }>({ loading: false });

    const form = useForm<FormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (data: FormData) => {
        setStatus({ loading: true });
        try {
            await authClient.signIn.email(
                { email: data.email, password: data.password },
                {
                    onSuccess: () => {
                        setStatus({ loading: false, success: "Login successful!" });
                        router.push("/dashboard");
                    },
                    onError: ({ error }) =>
                        setStatus({
                            loading: false,
                            error: error?.message ?? "Login failed",
                        }),
                }
            );
        } catch {
            setStatus({ loading: false, error: "Unexpected error" });
        }
    };

    const handleOAuth = async (provider: "google" | "github") => {
        setStatus({ ...status, oauthLoading: provider });
        try {
            await authClient.signIn.social({ provider }, {
                onSuccess: () => {
                    setStatus({ loading: false, success: "Login successful!" });
                    router.push("/dashboard");
                },
                onError: ({ error }) => {
                    setStatus({
                        loading: false,
                        error: error?.message ?? `${provider} login failed`,
                    });
                },
            });
        } catch {
            setStatus({
                loading: false,
                error: `Failed to initiate ${provider} login`,
            });
        }
    };


    return (
        <div className="border-0 p-8">
            <div className="py-5">
                <h3 className="text-lg font-semibold">Welcome back</h3>
                <p className="text-sm text-muted-foreground py-2">
                    Please sign in to continue
                </p>
            </div>

            <OAuth
                isLoading={status.loading}
                oauthLoading={status.oauthLoading}
                onOAuthAction={handleOAuth}
            />

            {/* Email Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="john@example.com"
                                        disabled={status.loading || !!status.oauthLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            disabled={status.loading || !!status.oauthLoading}
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                        disabled={status.loading || !!status.oauthLoading}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormButton
                        isLoading={status.loading}
                        btnName="Sign In"
                    />
                    <FormError message={status.error} />
                    <FormSuccess message={status.success} />
                </form>
            </Form>

            <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-primary underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default SignInView;