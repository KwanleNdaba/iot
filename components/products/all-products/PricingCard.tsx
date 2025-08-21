"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, Star } from "lucide-react";
import { PricingCardProps } from "@/interfaces/product";

const PricingCard: FC<PricingCardProps> = ({ 
  product, 
  isPopular, 
  onPurchase, 
  isPurchasing, 
  disabled 
}) => {
  const parsePriceAndCycle = (priceString: string) => {
    const priceMatch = priceString.match(/^(.+?)\/(.+)$/);
    return priceMatch ? { amount: priceMatch[1], cycle: priceMatch[2] } : { amount: priceString, cycle: null };
  };

  const { amount, cycle } = parsePriceAndCycle(product.price);
  
  const cardClasses = isPopular
    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl scale-105 border-2 border-blue-400"
    : "bg-white border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200";
    
  const textClasses = {
    title: isPopular ? "text-white" : "text-gray-900",
    description: isPopular ? "text-blue-100" : "text-gray-600",
    price: isPopular ? "text-white" : "text-gray-900",
    cycle: isPopular ? "text-blue-200" : "text-gray-600",
    features: isPopular ? "text-blue-200" : "text-gray-500",
    featureText: isPopular ? "text-blue-50" : "text-gray-700"
  };

  return (
    <div className={`relative rounded-xl p-6 transition-all duration-300 flex flex-col min-h-[420px] ${cardClasses}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
          <Star className="w-4 h-4" />
          <span>Most Popular</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold mb-2 ${textClasses.title}`}>
          {product.name}
        </h3>
        <p className={`text-sm mb-4 leading-relaxed ${textClasses.description}`}>
          {product.description}
        </p>
        
        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className={`text-4xl font-bold ${textClasses.price}`}>
            {amount}
          </span>
          {cycle && (
            <span className={`text-lg ${textClasses.cycle}`}>
              /{cycle}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 mb-6">
        {product.attributes?.features && (
          <div className="space-y-3">
            <h4 className={`text-sm font-semibold uppercase tracking-wider ${textClasses.features}`}>
              What's Included:
            </h4>
            <ul className="space-y-3">
              {product.attributes.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 mt-0.5 ${
                    isPopular ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
                  }`}>
                    <Check className="w-3 h-3" />
                  </div>
                  <span className={`text-sm leading-relaxed ${textClasses.featureText}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button
        onClick={() => onPurchase(product)}
        className={`w-full py-3 font-semibold transition-all duration-200 ${
          isPopular
            ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl"
            : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
        }`}
        disabled={isPurchasing || disabled}
        size="lg"
      >
        {isPurchasing ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Get Started with {product.name}
          </>
        )}
      </Button>

      {isPopular && (
        <p className="text-center text-xs text-blue-200 mt-2">
          Save 20% compared to Basic plan
        </p>
      )}
    </div>
  );
};

export default PricingCard;