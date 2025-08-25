"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

const FormSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

const SignInCard = ({ onForgotPassword }: { onForgotPassword: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            router.push("/organization");
            setLoading(false);
            toast.success("Login successful!");
        }, 2000);
    };

    return (
        <div className="w-full">
            <div className="mb-5 text-center">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    Log in to your account
                </h2>
                <p className="text-sm text-gray-600">
                    Enter your email and password to log in
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address
                                </label>
                                <FormControl>
                                    <Input
                                        placeholder="email@example.com"
                                        className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
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
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={onForgotPassword}
                                        className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200"
                    >
                        {loading ? <Loader text="Loading..." size="sm" /> : "Log in"}
                    </Button>
                </form>
            </Form>

            {/* Footer Link */}
            <div className="mt-5 text-center">
                <Link
                    href="https://www.smartsensorflow.com"
                    className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                >
                    Looking to purchase devices?
                </Link>
            </div>
        </div>
    );
};

export default SignInCard;