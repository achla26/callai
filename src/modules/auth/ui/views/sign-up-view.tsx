"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { RegisterSchema } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";

import OAuth from "@/modules/auth/ui/views/oauth";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormButton } from "@/components/form/FormButton";
import { FormError, FormSuccess } from "@/components/form/FormAlert";

type FormData = z.infer<typeof RegisterSchema>;

const SignUpView = () => {
    const router = useRouter();

    // UI helpers
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<{
        loading: boolean;
        error?: string;
        success?: string;
        oauthLoading?: "google" | "github";
    }>({ loading: false });

    // React‑Hook‑Form
    const form = useForm<FormData>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    /** Handle submit */
    const onSubmit = async (data: FormData) => {
        setStatus({ loading: true });
        try {
            await authClient.signUp.email(
                { email: data.email, password: data.password, name: data.name },
                {
                    onSuccess: () => {
                        setStatus({ loading: false, success: "Registration successful!" });
                        router.push("/"); // go to home (or /login)
                    },
                    onError: ({ error }) =>
                        setStatus({
                            loading: false,
                            error: error?.message ?? "Registration failed",
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
                <h3 className="text-lg font-semibold">Create your account</h3>

                <p className="text-sm text-muted-foreground py-2">Please fill in the fields below</p>
            </div>
            <OAuth
                isLoading={status.loading}
                oauthLoading={status.oauthLoading}
                onOAuthAction={handleOAuth}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* NAME */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="John Doe"
                                        disabled={status.loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EMAIL */}
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
                                        disabled={status.loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PASSWORD */}
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
                                            disabled={status.loading}
                                        />
                                    </FormControl>
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                        onClick={() => setShowPassword((p) => !p)}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CONFIRM PASSWORD */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                        disabled={status.loading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* SUBMIT */}
                    <FormButton isLoading={status.loading} btnName="Sign Up" />

                    {/* ALERTS */}
                    <FormError message={status.error} />
                    <FormSuccess message={status.success} />
                </form>
            </Form>

            <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-primary underline">
                    Log in here
                </Link>
            </p>
        </div>
    );
};

export default SignUpView;
