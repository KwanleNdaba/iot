// SignInSignUpSwitcher.tsx
"use client"
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";
import ForgotPasswordCard from "./ForgotPasswordCard";

type ViewState = 'signin' | 'signup' | 'forgot';

const SignInSignUpSwitcher: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('signin');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signin':
        return <SignInCard onForgotPassword={() => setCurrentView('forgot')} />;
      case 'signup':
        return <SignUpCard />;
      case 'forgot':
        return <ForgotPasswordCard onBackToSignIn={() => setCurrentView('signin')} />;
      default:
        return <SignInCard onForgotPassword={() => setCurrentView('forgot')} />;
    }
  };

  const renderFooter = () => {
    if (currentView === 'forgot') {
      return null;
    }

    return (
      <CardFooter className="flex flex-col">
        <div>
          {currentView === 'signin' ? (
            <div className="flex flex-row justify-center items-center gap-1">
              <p>Don't have an account?</p>
              <Button
                variant={"link"}
                className="p-0 m-0"
                onClick={() => setCurrentView('signup')}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-1">
              <p>Already have an account?</p>
              <Button
                variant={"link"}
                className="p-0 m-0"
                onClick={() => setCurrentView('signin')}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    );
  };

  return (
    <div className="flex flex-row justify-around m-0 p-0 items-center min-h-screen">
      {/* IoT Logo Image - Only shown in the switcher */}
      <img src="/images/iot-logo.jpeg" className="w-[55%] opacity-70" />
      
      {/* Main Card Container */}
      <Card className="w-[30%] h-fit min-h-[400px] shadow-lg border-none outline-none p-0 m-0 flex flex-col">
        {/* Logo - Only shown in the switcher */}
        <div className="flex justify-center mb-6 pt-4">
          <img
            alt="logo"
            src="/images/ssfLogo.png"
            className="w-32 md:w-40 lg:w-48 h-auto"
          />
        </div>

        {/* Content Area */}
        <CardContent className="border-none outline-none px-6 sm:px-8 pb-0 flex-1">
          {renderCurrentView()}
        </CardContent>
        
        {/* Footer for switching between signin/signup */}
        {renderFooter()}
      </Card>
    </div>
  );
};

export default SignInSignUpSwitcher;