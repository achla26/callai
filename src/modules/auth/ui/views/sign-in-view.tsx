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
import { CardWrapper } from "@/components/cards/CardWrapper";
import { BasicCard } from "@/components/cards/BasicCard";
import { FormButton } from "@/components/form/FormButton";
import { FormError, FormSuccess } from "@/components/form/FormAlert";

import { Eye, EyeOff } from "lucide-react";

type FormData = z.infer<typeof LoginSchema>;

const SignInView = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<{
        loading: boolean;
        error?: string;
        success?: string;
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
                    onSuccess: () =>
                        setStatus({ loading: false, success: "Login successful!" }),
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

    return (

        <div className="border-0 p-8">
            <div className="py-5">
                <h3 className="text-lg font-semibold">Create your account</h3>

                <p className="text-sm text-muted-foreground py-2">Please fill in the fields below</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
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
                                        onClick={() => setShowPassword((p) => !p)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormButton isLoading={status.loading} btnName="Sign In" />
                    <FormError message={status.error} />
                    <FormSuccess message={status.success} />
                </form>
            </Form>

            <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <Link href="/sign-up" className="text-primary underline">
                    Register here
                </Link>
            </p>
        </div>

    );
};

export default SignInView;
