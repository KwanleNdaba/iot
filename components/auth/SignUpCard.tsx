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
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const SignUpCard: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!agreeToTerms) {
            toast.error("Please agree to the terms and conditions");
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success("Account created successfully!");
        }, 2000);
    };

    return (
        <div className="w-full">
            <div className="mb-4 text-center">
                <h2 className="text-xl font-medium text-gray-900 mb-1">
                    Create your account
                </h2>
                <p className="text-sm text-gray-600">
                    Fill in your details to get started
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <FormControl>
                                        <Input
                                            placeholder="John"
                                            className="h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <FormControl>
                                        <Input
                                            placeholder="Doe"
                                            className="h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <FormControl>
                                    <Input
                                        placeholder="email@example.com"
                                        className="h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        className="h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-start pt-1">
                        <input
                            id="agree-terms"
                            name="agree-terms"
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                        />
                        <label htmlFor="agree-terms" className="ml-2 block text-xs text-gray-700 leading-tight">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                                Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || !agreeToTerms}
                        className="w-full h-9 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 disabled:opacity-50 text-sm"
                    >
                        {loading ? <Loader text="Creating account..." size="sm" /> : "Create Account"}
                    </Button>
                </form>
            </Form>

            {/* Footer Link */}
            <div className="mt-4 text-center">
                <Link
                    href="/purchase"
                    className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
                >
                    Looking to purchase devices?
                </Link>
            </div>
        </div>
    );
};

export default SignUpCard;