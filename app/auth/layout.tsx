"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Shield } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import SmartLogo from "@/public/images/smartLogo.jpg";

interface AuthLayoutProps {
    children: React.ReactNode;
    showBackToHome?: boolean;
    title?: string;
    subtitle?: string;
}

export default function AuthLayout({ 
    children, 
    showBackToHome = true, 
    title = "Smart Sensor Flow",
    subtitle = "Enterprise IoT Platform"
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
            
            {/* Header Navigation */}
            <header className="relative z-10 px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3"
                    >
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-white bg-white">
                            <Image
                                src={SmartLogo}
                                alt="Smart Sensor Flow Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                            <p className="text-xs text-gray-600">{subtitle}</p>
                        </div>
                    </motion.div>

                    {/* Navigation Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        {showBackToHome && (
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium text-gray-700 shadow-sm"
                            >
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Home</span>
                            </Link>
                        )}
                        
                        <Link
                            href="/organization/support"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm"
                        >
                            <Shield className="w-4 h-4" />
                            <span className="hidden sm:inline">Need Help?</span>
                        </Link>
                    </motion.div>
                </div>
            </header>

            {/* Main Content */}
            <main className="">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-6 py-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600"
                    >
                        <div className="flex items-center gap-4">
                            <Link href="/privacy-policy" className="hover:text-gray-900 underline">
                                Privacy Policy
                            </Link>
                            <span>•</span>
                            <Link href="/terms-of-service" className="hover:text-gray-900 underline">
                                Terms of Service
                            </Link>
                            <span>•</span>
                            <Link href="/contact" className="hover:text-gray-900 underline">
                                Contact Us
                            </Link>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-green-600">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>All systems operational</span>
                            </div>
                            <span className="text-gray-500">© 2025 Smart Sensor Flow</span>
                        </div>
                    </motion.div>
                </div>
            </footer>

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