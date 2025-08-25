"use client";
import { FC, ReactNode, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ChevronRight, 
  Menu, 
  X, 
  Bell, 
  Settings, 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  Lock,
  FileText,
  Shield,
  RefreshCw,
  DollarSign,
  ChevronDown,
  Building2,
  User,
  Home,
  LogOut,
  MoreHorizontal,
  LineChart,
  AlertTriangle,
  TrendingUp,
  Activity
} from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState({
    organization: true,
    products: true,
    policies: false
  });
  
  // Mock state - you can adjust these values
  const [isLoading] = useState(false); // Set to true to test loading state
  const [authenticated] = useState(true); // Set to false to test unauthenticated state

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const homeItem =     { id: 'overview', label: 'Overview', icon: BarChart3, href: '/organization' }  ;

  const organizationItems = [
    { id: 'devices', label: 'Devices', icon: Activity, href: '/organization/devices' },
    { id: 'dashboards', label: 'My Dashboards', icon: LineChart, href: '/organization/dashboards' },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, href: '/organization/alerts' },
    { id: 'users', label: 'Users', icon: Users, href: '/organization/users' },
    { id: 'permissions', label: 'Permissions', icon: Lock, href: '/organization/permissions' },
  ];

  const productItems = [
    { id: 'my-products', label: 'My Products', icon: Package, count: 3, href: '/organization/my-products' },
    { id: 'all-products', label: 'All Products', icon: ShoppingCart, href: '/organization/marketplace' },
  ];

  const policyItems = [
    { id: 'terms', label: 'Terms & Conditions', icon: FileText, href: '/organization/terms-conditions' },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield, href: '/organization/privacy-policy' },
    { id: 'refund', label: 'Refund Policy', icon: RefreshCw, href: '/organization//refund-policy' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '/organization/pricing' },
  ];

  const SectionHeader = ({ title, isExpanded, onToggle, count }: any) => (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider hover:text-gray-800 transition-colors"
    >
      <div className="flex items-center space-x-2">
        <span>{title}</span>
        {count && (
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      <ChevronDown 
        className={`h-4 w-4 transition-transform duration-200 text-gray-400 ${
          isExpanded ? 'rotate-180' : ''
        }`}
      />
    </button>
  );

  const MenuItem = ({ item, isActive, onClick }: any) => {
    const Icon = item.icon;
    
    const content = (
      <>
        <Icon className={`h-4 w-4 mr-3 transition-colors ${
          isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
        }`} />
        <span className="flex-1 text-left font-medium">{item.label}</span>
        {item.count && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            isActive 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
          }`}>
            {item.count}
          </span>
        )}
      </>
    );

    const className = `
      flex items-center w-full px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group
      ${isActive 
        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      }
    `;

    if (item.href) {
      return (
        <Link href={item.href} className={className} onClick={() => onClick(item.id)}>
          {content}
        </Link>
      );
    }

    return (
      <button onClick={() => onClick(item.id)} className={className}>
        {content}
      </button>
    );
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [{ title: "Home", href: "/" }];

    const component = searchParams.get("component");

    if (pathname === "/organization") {
      breadcrumbs.push({ title: "Organization", href: "/organization" });
      if (component) {
        const componentTitles: Record<string, string> = {
          admin: "Admin",
          dashboard: "Dashboard",
          users: "Users",
          permissions: "Permissions",
        };
        const componentTitle = component;
        breadcrumbs.push({
          title: componentTitles[componentTitle] || componentTitle,
          href: `/organization?component=${componentTitle}`,
        });
      }
    } else if (pathname === "/products") {
      breadcrumbs.push({ title: "Products", href: "/products" });
      if (component) {
        const componentTitles: Record<string, string> = {
          "my-products": "My Products",
          "all-products": "All Products",
        };
        const componentTitle = component;
        breadcrumbs.push({
          title: componentTitles[componentTitle] || componentTitle,
          href: `/products?component=${componentTitle}`,
        });
      }
    } else if (pathname === "/profile") {
      breadcrumbs.push({ title: "Profile", href: "/profile" });
      if (component) {
        const componentTitles: Record<string, string> = {
          profile: "Profile",
          settings: "Settings",
          security: "Security",
        };
        const componentTitle = component;
        breadcrumbs.push({
          title: componentTitles[componentTitle] || componentTitle,
          href: `/profile?component=${componentTitle}`,
        });
      }
    } else if (pathname === "/billing") {
      breadcrumbs.push({ title: "Billing", href: "/billing" });
      if (component) {
        const componentTitles: Record<string, string> = {
          subscription: "Subscription",
          invoices: "Invoices",
          payment: "Payment Methods",
        };
        const componentTitle = component;
        breadcrumbs.push({
          title: componentTitles[componentTitle] || componentTitle,
          href: `/billing?component=${componentTitle}`,
        });
      }
    } else if (pathname === "/terms-and-conditions") {
      breadcrumbs.push({
        title: "Terms & Conditions",
        href: "/terms-and-conditions",
      });
    } else if (pathname === "/privacy-policy") {
      breadcrumbs.push({ title: "Privacy Policy", href: "/privacy-policy" });
    } else if (pathname === "/refund-policy") {
      breadcrumbs.push({ title: "Refund Policy", href: "/refund-policy" });
    } else if (pathname === "/pricing") {
      breadcrumbs.push({ title: "Pricing", href: "/pricing" });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative lg:flex flex-col w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Sidebar Header - Close Button for Mobile */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="p-5 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-700 font-semibold text-sm">T</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-gray-900 truncate">
                TechCorp Solutions
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-gray-500 font-medium">Active Plan</p>
              </div>
            </div>
            <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-6">
            {/* Home */}
            <div className="px-2">
              <MenuItem
                item={homeItem}
                isActive={activeItem === homeItem.id}
                onClick={setActiveItem}
              />
            </div>

            {/* Organization Section */}
            <div>
              <SectionHeader
                title="Organization"
                isExpanded={expandedSections.organization}
                onToggle={() => toggleSection('organization')}
              />
              {expandedSections.organization && (
                <div className="mt-2 space-y-1 px-2">
                  {organizationItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isActive={activeItem === item.id}
                      onClick={setActiveItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Products Section */}
            <div>
              <SectionHeader
                title="Marketplace"
                isExpanded={expandedSections.products}
                onToggle={() => toggleSection('products')}
              />
              {expandedSections.products && (
                <div className="mt-2 space-y-1 px-2">
                  {productItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isActive={activeItem === item.id}
                      onClick={setActiveItem}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Policies Section */}
            <div>
              <SectionHeader
                title="Policies"
                isExpanded={expandedSections.policies}
                onToggle={() => toggleSection('policies')}
              />
              {expandedSections.policies && (
                <div className="mt-2 space-y-1 px-2">
                  {policyItems.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isActive={activeItem === item.id}
                      onClick={setActiveItem}
                    />
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">john.doe@techcorp.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="h-4 w-4 text-gray-400" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <LogOut className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <header className="flex h-16 items-center gap-4 bg-white border-b border-gray-200 px-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block w-px h-4 bg-gray-300 mx-2" />

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{breadcrumb.title}</span>
                ) : (
                  <Link 
                    href={breadcrumb.href} 
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {breadcrumb.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Notification Bell */}
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </header>
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            {authenticated && isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-sm text-gray-600">Loading application data...</p>
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
        
        {/* Fixed Footer */}
        <footer className="bg-gray-100 border-t border-gray-200 px-4 py-2">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>&copy; 2025 Smart Sensor Flow LLC</p>
            <p>v4.3.1.3PAAS</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout