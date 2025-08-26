// components/Navigation.tsx
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/images/icon.jpg" className="w-[55%] opacity-70" alt="Smart Sensor Flow Logo" />
            </div>
            <span className="text-xl font-bold text-gray-900">Smart Sensor Flow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#marketplace" className="text-gray-600 hover:text-blue-600 transition-colors">Marketplace</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex cursor-pointer text-gray-600 hover:text-blue-600 transition-colors items-center space-x-4">
            <Link href="/auth/signin">
              <Button className='cursor-pointer' variant="ghost">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-2">
                <a href="#features" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Features</a>
                <a href="#pricing" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Pricing</a>
                <a href="#marketplace" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Marketplace</a>
                <a href="#contact" className="block px-4 py-2 text-gray-600 hover:text-blue-600">Contact</a>
                <div className="px-4 pt-4 border-t border-gray-200 space-y-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;