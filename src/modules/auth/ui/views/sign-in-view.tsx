"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth";
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
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { FormButton } from "@/components/form/FormButton";
import { FormError, FormSuccess } from "@/components/form/FormAlert";
import { authClient } from "@/lib/auth-client";
import { session } from '@/db/schema';

type FormData = z.infer<typeof LoginSchema>;

interface LoginFormState {
    error?: string;
    success?: string;
    isLoading: boolean;
    showPassword: boolean;
}
const SignInView = () => {


    const [state, setState] = useState<LoginFormState>(() => ({
        error: "",
        success: "",
        isLoading: false,
        showPassword: false,
    }));

    const [isLoading, setIsLoading] = useState<"google" | "github" | null>(() => null);

    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(() => false);

    const togglePasswordVisibility = () => {
        setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
    };

    const form = useForm<FormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = async (data: FormData) => {
        setState({
            error: "",
            success: "",
            isLoading: true,
            showPassword: state.showPassword,
        });

        try {
            // Use signIn instead of signUp
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
            }, {
                onRequest: (ctx) => {
                    console.log("Request:", ctx);
                },
                onSuccess: (ctx) => {
                    console.log("Success:", ctx);
                    setState(prev => ({
                        ...prev,
                        success: "Login successful!",
                        isLoading: false
                    }));
                },
                onError: (ctx) => {
                    console.error("Error:", ctx.error);
                    setState(prev => ({
                        ...prev,
                        error: ctx.error?.message || "Login failed",
                        isLoading: false
                    }));
                },
            });

        } catch (error) {
            setState(prev => ({
                ...prev,
                error: "An unexpected error occurred",
                isLoading: false,
            }));
        }
    };

    return (

        <CardWrapper cols={1} className="max-w-md mx-auto">
            <BasicCard
                title="Welcome Back"
                content="Please enter your credentials"
                className="border-0 shadow-lg"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">



                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium text-gray-700">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={state.isLoading}
                                                type="email"
                                                placeholder="john@example.com"
                                                autoComplete="email"
                                                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-500" />
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
                                                    disabled={state.isLoading}
                                                    type={state.showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <button
                                                type="button"
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {state.showPassword ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Submit Button */}
                        <FormButton isLoading={state.isLoading} btnName="Sign Up" />

                        <FormError message={state.error} />
                        <FormSuccess message={state.success} />

                    </form>
                </Form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Social Login Buttons */}

                <div className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Register here
                    </Link>
                </div>
            </BasicCard>
        </CardWrapper>
    );
};

export default SignInView;