"use client";
import { FC } from "react";
import { 
  CheckCircle, 
  DollarSign, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Package
} from "lucide-react";
import { ProductsSummaryProps } from "@/interfaces/product";

const ProductsSummary: FC<ProductsSummaryProps> = ({ 
  subscriptions, 
  totalMonthlyCost, 
  currency 
}) => {
  const activeCount = subscriptions.filter(sub => sub.status === "Active").length;
  const nonRenewingCount = subscriptions.filter(sub => sub.status === "NonRenewing").length;
  
  const expiringCount = subscriptions.filter(sub => {
    const paymentDate = new Date(sub.nextPaymentDate);
    const today = new Date();
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && sub.status === "Active";
  }).length;

  const formatCurrency = (amount: number, curr: string) => {
    const locale = curr === "ZAR" ? "en-ZA" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: curr || "USD",
    }).format(amount);
  };

  // Calculate average subscription cost
  const averageCost = activeCount > 0 ? totalMonthlyCost / activeCount : 0;

  // Mock previous month data for comparison (in real app this would come from API)
  const previousMonthCost = totalMonthlyCost * 0.85; // 15% increase
  const costChange = totalMonthlyCost - previousMonthCost;
  const costChangePercent = previousMonthCost > 0 ? (costChange / previousMonthCost) * 100 : 0;

  const summaryCards = [
    {
      id: 'total',
      title: 'Total Subscriptions',
      value: subscriptions.length,
      icon: Package,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      subtitle: `${activeCount} active, ${nonRenewingCount} expiring`,
      trend: null
    },
    {
      id: 'active',
      title: 'Active Subscriptions',
      value: activeCount,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
      subtitle: `${Math.round((activeCount / subscriptions.length) * 100)}% of total`,
      trend: null
    },
    {
      id: 'cost',
      title: 'Monthly Investment',
      value: formatCurrency(totalMonthlyCost, currency),
      icon: DollarSign,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
      subtitle: `Avg ${formatCurrency(averageCost, currency)} per module`,
      trend: {
        value: costChangePercent,
        isPositive: costChange > 0,
        label: `${costChangePercent > 0 ? '+' : ''}${costChangePercent.toFixed(1)}% vs last month`
      }
    },
    {
      id: 'expiring',
      title: 'Renewing Soon',
      value: expiringCount,
      icon: expiringCount > 0 ? AlertTriangle : Clock,
      color: expiringCount > 0 ? 'amber' : 'gray',
      bgColor: expiringCount > 0 ? 'bg-amber-50' : 'bg-gray-50',
      iconBg: expiringCount > 0 ? 'bg-amber-100' : 'bg-gray-100',
      iconColor: expiringCount > 0 ? 'text-amber-600' : 'text-gray-500',
      textColor: expiringCount > 0 ? 'text-amber-900' : 'text-gray-700',
      subtitle: expiringCount > 0 ? 'Requires attention' : 'All renewals on track',
      trend: null
    }
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Subscription Overview</h2>
          <p className="text-sm text-gray-600">Your current subscription portfolio and spending</p>
        </div>
     
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          
          return (
            <div 
              key={card.id}
              className={`${card.bgColor} border-2 border-transparent hover:border-${card.color}-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`flex items-center justify-center w-10 h-10 ${card.iconBg} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                        {card.title}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`text-2xl font-bold ${card.textColor}`}>
                      {card.value}
                    </div>
                    <div className="text-xs text-gray-600">
                      {card.subtitle}
                    </div>
                    
                    {card.trend && (
                      <div className="flex items-center space-x-1 mt-2">
                        {card.trend.isPositive ? (
                          <ArrowUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs font-medium ${
                          card.trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {card.trend.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Alert indicator for expiring subscriptions */}
              {card.id === 'expiring' && expiringCount > 0 && (
                <div className="mt-3 pt-3 border-t border-amber-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-amber-800">
                      Action needed within 7 days
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Insights */}
      {subscriptions.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">
                Portfolio Insights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-blue-800">
                <div>
                  <span className="font-medium">Subscription Health:</span> {
                    (activeCount / subscriptions.length * 100).toFixed(0)
                  }% active rate
                </div>
                <div>
                  <span className="font-medium">Average Module Cost:</span> {formatCurrency(averageCost, currency)}
                </div>
                <div>
                  <span className="font-medium">Annual Projection:</span> {formatCurrency(totalMonthlyCost * 12, currency)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSummary;