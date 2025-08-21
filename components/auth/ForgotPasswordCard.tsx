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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

// Schema for email step
const EmailSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email.",
    }),
});

// Schema for OTP step
const OTPSchema = z.object({
    otp: z.string().min(6, {
        message: "OTP must be 6 digits.",
    }).max(6, {
        message: "OTP must be 6 digits.",
    }),
});

// Schema for password reset step
const ResetPasswordSchema = z.object({
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

type ForgotPasswordStep = 'email' | 'otp' | 'reset' | 'success';

const ForgotPasswordCard = ({ onBackToSignIn }: { onBackToSignIn: () => void }) => {
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email');
    const [userEmail, setUserEmail] = useState('');
    
    // Forms for each step
    const emailForm = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: { email: "" },
    });
    
    const otpForm = useForm<z.infer<typeof OTPSchema>>({
        resolver: zodResolver(OTPSchema),
        defaultValues: { otp: "" },
    });
    
    const resetForm = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    // Handle email submission
    const onEmailSubmit = async (data: z.infer<typeof EmailSchema>) => {
        setLoading(true);
        setUserEmail(data.email);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setCurrentStep('otp');
            toast.success("OTP sent to your email!");
        }, 2000);
    };

    // Handle OTP verification
    const onOTPSubmit = async (data: z.infer<typeof OTPSchema>) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setCurrentStep('reset');
            toast.success("OTP verified successfully!");
        }, 2000);
    };

    // Handle password reset
    const onResetSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setCurrentStep('success');
            toast.success("Password reset successfully!");
        }, 2000);
    };

    // Resend OTP
    const resendOTP = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("OTP resent to your email!");
        }, 1500);
    };

    // Step 1: Email Input
    if (currentStep === 'email') {
        return (
            <div className="w-full">
                <div className="mb-5 text-center">
                    <h2 className="text-xl font-medium text-gray-900 mb-2">
                        Forgot your password?
                    </h2>
                    <p className="text-sm text-gray-600">
                        Enter your email address and we'll send you a verification code
                    </p>
                </div>

                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                        <FormField
                            control={emailForm.control}
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

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200"
                        >
                            {loading ? <Loader text="Sending..." size="sm" /> : "Send Verification Code"}
                        </Button>
                    </form>
                </Form>

                <div className="mt-5 text-center">
                    <button
                        type="button"
                        onClick={onBackToSignIn}
                        className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                    >
                        Back to sign in
                    </button>
                </div>
            </div>
        );
    }

    // Step 2: OTP Verification
    if (currentStep === 'otp') {
        return (
            <div className="w-full">
                <div className="mb-5 text-center">
                    <h2 className="text-xl font-medium text-gray-900 mb-2">
                        Verify your email
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">
                        We've sent a 6-digit verification code to
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                        {userEmail}
                    </p>
                </div>

                <Form {...otpForm}>
                    <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-5">
                        <FormField
                            control={otpForm.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Verification Code
                                    </label>
                                    <FormControl>
                                        <Input
                                            placeholder="000000"
                                            maxLength={6}
                                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center text-lg tracking-widest"
                                            {...field}
                                            onChange={(e) => {
                                                // Only allow numbers
                                                const value = e.target.value.replace(/\D/g, '');
                                                field.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200"
                        >
                            {loading ? <Loader text="Verifying..." size="sm" /> : "Verify Code"}
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 text-center space-y-2">
                    <p className="text-sm text-gray-600">
                        Didn't receive the code?
                    </p>
                    <button
                        type="button"
                        onClick={resendOTP}
                        disabled={loading}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline disabled:text-gray-400"
                    >
                        Resend Code
                    </button>
                </div>

                <div className="mt-5 text-center">
                    <button
                        type="button"
                        onClick={() => setCurrentStep('email')}
                        className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
                    >
                        Change email address
                    </button>
                </div>
            </div>
        );
    }

    // Step 3: Reset Password
    if (currentStep === 'reset') {
        return (
            <div className="w-full">
                <div className="mb-5 text-center">
                    <h2 className="text-xl font-medium text-gray-900 mb-2">
                        Reset your password
                    </h2>
                    <p className="text-sm text-gray-600">
                        Enter your new password below
                    </p>
                </div>

                <Form {...resetForm}>
                    <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                        <FormField
                            control={resetForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={resetForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200 mt-6"
                        >
                            {loading ? <Loader text="Resetting..." size="sm" /> : "Reset Password"}
                        </Button>
                    </form>
                </Form>
            </div>
        );
    }

    // Step 4: Success
    return (
        <div className="w-full text-center">
            <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                    Password reset successful!
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    Your password has been successfully reset. You can now sign in with your new password.
                </p>
            </div>

            <Button
                onClick={onBackToSignIn}
                className="w-full h-10 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors duration-200"
            >
                Back to Sign In
            </Button>
        </div>
    );
};

export default ForgotPasswordCard;