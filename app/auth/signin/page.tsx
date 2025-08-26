"use client";

import React, { useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Lock, Mail, Building2 } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import SmartLogo from "@/public/images/smartLogo.jpg";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

const FormSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
});

export default function OrganizationSigninPage() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
            setLoading(false);
            toast.success("Welcome back! Signing you in...");
            router.push("/organization/dashboard");
        }, 1500);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                {/* Main Signin Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 relative overflow-hidden">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
                    
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white"
                        >
                            <Image
                                src={SmartLogo}
                                alt="Smart Sensor Flow Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome back
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Sign in to your organization account
                        </p>
                    </motion.div>

                    {/* Signin Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <Input
                                                        placeholder="email@company.com"
                                                        className="h-12 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Password
                                            </label>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Lock className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                        className="h-12 pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
                                                        {...field}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-md transition-colors"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                        ) : (
                                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-xs mt-1" />
                                        </FormItem>
                                    )}
                                />

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
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
                                    <Link
                                        href="/auth/reset-password"
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader text="Signing you in..." size="sm" />
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Form>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mt-8 mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* SSO Options */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="space-y-3"
                    >
                        <Button
                            variant="outline"
                            className="w-full h-12 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
                            onClick={() => toast.info("SSO integration coming soon")}
                        >
                            <div className="flex items-center justify-center">
                                <Building2 className="w-5 h-5 mr-2" />
                                Single Sign-On (SSO)
                            </div>
                        </Button>
                    </motion.div>

                    {/* Footer Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-8 text-center space-y-4"
                    >
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href="/auth/signup"
                                className="text-blue-600 hover:text-blue-800 font-medium underline"
                            >
                                Create an organization
                            </Link>
                        </p>
                        
                        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                            <Link href="/organization/privacy-policy" className="hover:text-gray-700 underline">
                                Privacy
                            </Link>
                            <span>•</span>
                            <Link href="/organization/terms-conditions" className="hover:text-gray-700 underline">
                                Terms
                            </Link>
                            <span>•</span>
                            <Link href="/organization/support" className="hover:text-gray-700 underline">
                                Support
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Security Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="mt-6 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Secured with enterprise-grade encryption</span>
                    </div>
                </motion.div>
            </motion.div>

            {/* Background Grid Pattern */}
            <style jsx>{`
                .bg-grid-pattern {
                    background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0);
                    background-size: 40px 40px;
                }
            `}</style>
        </div>
    );
}