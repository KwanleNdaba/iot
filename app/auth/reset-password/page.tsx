"use client";

import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, 
    ArrowLeft, 
    Mail, 
    Lock, 
    Shield, 
    CheckCircle, 
    Eye, 
    EyeOff,
    Clock,
    RefreshCw
} from 'lucide-react';
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

// Form schemas for each step
const EmailSchema = z.object({
    email: z.string().email({
        message: "Must be a valid email address.",
    }),
});

const OTPSchema = z.object({
    otp: z.string().min(6, {
        message: "OTP must be 6 digits.",
    }).max(6, {
        message: "OTP must be 6 digits.",
    }).regex(/^\d+$/, {
        message: "OTP must contain only numbers.",
    }),
});

const PasswordSchema = z.object({
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: "Password must contain uppercase, lowercase, number, and special character.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type Step = 'email' | 'otp' | 'password';

interface StepInfo {
    step: Step;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const steps: StepInfo[] = [
    {
        step: 'email',
        title: 'Reset your password',
        subtitle: 'Enter your email address and we\'ll send you a verification code',
        icon: <Mail className="w-6 h-6" />
    },
    {
        step: 'otp',
        title: 'Enter verification code',
        subtitle: 'We sent a 6-digit code to your email address',
        icon: <Shield className="w-6 h-6" />
    },
    {
        step: 'password',
        title: 'Create new password',
        subtitle: 'Choose a strong password for your account',
        icon: <Lock className="w-6 h-6" />
    }
];

export default function ResetPasswordFlow() {
    const [currentStep, setCurrentStep] = useState<Step>('email');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const router = useRouter();

    // Timer effect for OTP resend
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    const emailForm = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: { email: "" },
    });

    const otpForm = useForm<z.infer<typeof OTPSchema>>({
        resolver: zodResolver(OTPSchema),
        defaultValues: { otp: "" },
    });

    const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    const currentStepInfo = steps.find(s => s.step === currentStep)!;
    const currentStepIndex = steps.findIndex(s => s.step === currentStep);

    const handleEmailSubmit = async (data: z.infer<typeof EmailSchema>) => {
        setLoading(true);
        setEmail(data.email);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setCurrentStep('otp');
            setOtpTimer(60); // Start 60 second timer
            toast.success("Verification code sent to your email!");
        }, 1500);
    };

    const handleOTPSubmit = async (data: z.infer<typeof OTPSchema>) => {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setCurrentStep('password');
            toast.success("Code verified successfully!");
        }, 1000);
    };

    const handlePasswordSubmit = async (data: z.infer<typeof PasswordSchema>) => {
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success("Password reset successfully!");
            router.push("/organization/signin");
        }, 1500);
    };

    const handleResendOTP = () => {
        if (otpTimer > 0) return;
        
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOtpTimer(60);
            toast.success("New verification code sent!");
        }, 1000);
    };

    const goBack = () => {
        if (currentStep === 'otp') {
            setCurrentStep('email');
        } else if (currentStep === 'password') {
            setCurrentStep('otp');
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 relative overflow-hidden">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
                    
                    {/* Progress Indicator */}
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-3">
                            {steps.map((step, index) => (
                                <React.Fragment key={step.step}>
                                    <div className={`relative transition-all duration-300 ${
                                        index <= currentStepIndex ? 'scale-100' : 'scale-90'
                                    }`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                                            index < currentStepIndex 
                                                ? 'bg-green-500 border-green-500 text-white' 
                                                : index === currentStepIndex 
                                                    ? 'bg-blue-500 border-blue-500 text-white' 
                                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                        }`}>
                                            {index < currentStepIndex ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <span className="text-sm font-semibold">{index + 1}</span>
                                            )}
                                        </div>
                                        {index < currentStepIndex && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -inset-1 rounded-full border-2 border-green-200 animate-pulse"
                                            />
                                        )}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`h-0.5 w-8 transition-colors ${
                                            index < currentStepIndex ? 'bg-green-500' : 'bg-gray-300'
                                        }`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <motion.div
                            key={currentStep}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white bg-white"
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

                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <div className="text-blue-600">
                                            {currentStepInfo.icon}
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {currentStepInfo.title}
                                </h1>
                                <p className="text-gray-600">
                                    {currentStepInfo.subtitle}
                                </p>
                                {currentStep === 'otp' && email && (
                                    <p className="text-sm text-blue-600 font-medium mt-2">
                                        {email}
                                    </p>
                                )}
                            </div>

                            {/* Step 1: Email */}
                            {currentStep === 'email' && (
                                <Form {...emailForm}>
                                    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
                                        <FormField
                                            control={emailForm.control}
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

                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200"
                                        >
                                            {loading ? (
                                                <Loader text="Sending code..." size="sm" />
                                            ) : (
                                                <>
                                                    Send verification code
                                                    <ArrowRight className="w-4 h-4 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </Form>
                            )}

                            {/* Step 2: OTP */}
                            {currentStep === 'otp' && (
                                <Form {...otpForm}>
                                    <form onSubmit={otpForm.handleSubmit(handleOTPSubmit)} className="space-y-6">
                                        <FormField
                                            control={otpForm.control}
                                            name="otp"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Verification Code
                                                    </label>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Shield className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                            <Input
                                                                placeholder="000000"
                                                                className="h-12 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base text-center tracking-widest"
                                                                maxLength={6}
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs mt-1" />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Timer and Resend */}
                                        <div className="text-center text-sm">
                                            {otpTimer > 0 ? (
                                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                                    <Clock className="w-4 h-4" />
                                                    <span>Resend code in {formatTime(otpTimer)}</span>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleResendOTP}
                                                    disabled={loading}
                                                    className="text-blue-600 hover:text-blue-800 font-medium underline flex items-center justify-center gap-2"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                    Resend verification code
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                onClick={goBack}
                                                variant="outline"
                                                className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
                                            >
                                                {loading ? (
                                                    <Loader text="Verifying..." size="sm" />
                                                ) : (
                                                    <>
                                                        Verify code
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}

                            {/* Step 3: New Password */}
                            {currentStep === 'password' && (
                                <Form {...passwordForm}>
                                    <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6">
                                        <FormField
                                            control={passwordForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        New Password
                                                    </label>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Lock className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                            <Input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Enter new password"
                                                                className="h-12 pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowPassword(!showPassword)}
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

                                        <FormField
                                            control={passwordForm.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Confirm New Password
                                                    </label>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                                <Lock className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                            <Input
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                placeholder="Confirm new password"
                                                                className="h-12 pl-10 pr-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base"
                                                                {...field}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-50 rounded-r-md transition-colors"
                                                            >
                                                                {showConfirmPassword ? (
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

                                        {/* Password Requirements */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-blue-900 mb-2">Password requirements:</h4>
                                            <ul className="text-xs text-blue-700 space-y-1">
                                                <li>• At least 8 characters long</li>
                                                <li>• Contains uppercase and lowercase letters</li>
                                                <li>• Contains at least one number</li>
                                                <li>• Contains at least one special character</li>
                                            </ul>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                type="button"
                                                onClick={goBack}
                                                variant="outline"
                                                className="flex-1 h-12 border-gray-300 hover:bg-gray-50"
                                            >
                                                <ArrowLeft className="w-4 h-4 mr-2" />
                                                Back
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium"
                                            >
                                                {loading ? (
                                                    <Loader text="Resetting password..." size="sm" />
                                                ) : (
                                                    <>
                                                        Reset password
                                                        <CheckCircle className="w-4 h-4 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-gray-600">
                            Remember your password?{" "}
                            <Link
                                href="/auth/signin"
                                className="text-blue-600 hover:text-blue-800 font-medium underline"
                            >
                                Back to sign in
                            </Link>
                        </p>
                    </motion.div>
                </div>

                {/* Security Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="mt-6 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Secure password reset process</span>
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