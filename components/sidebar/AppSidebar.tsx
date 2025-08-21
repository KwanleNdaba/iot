import React, { useState } from 'react';
import Link from 'next/link';
import { 
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
  Bell,
  Home,
  LucideIcon,
  LogOut,
  MoreHorizontal
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
  count?: number;
  href?: string;
}

interface ExpandedSections {
  organization: boolean;
  products: boolean;
  policies: boolean;
}

interface SectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  count?: number;
}

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
  onClick: (id: string) => void;
}

const ProfessionalSidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState({
    organization: true,
    products: true,
    policies: false
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const homeItem: MenuItem = { id: 'home', label: 'Home', icon: Home, href: '/client/home' };

  const organizationItems: MenuItem[] = [
    { id: 'admin', label: 'Admin', icon: Settings, href: '#/admin' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/client/dashboard' },
    { id: 'users', label: 'Users', icon: Users, href: '/client/users' },
    { id: 'permissions', label: 'Permissions', icon: Lock, href: '/client/permissions' },
  ];

  const productItems: MenuItem[] = [
    { id: 'my-products', label: 'My Products', icon: Package, count: 3, href: '/client/products/my-products' },
    { id: 'all-products', label: 'All Products', icon: ShoppingCart, href: '/client/products' },
  ];

  const policyItems: MenuItem[] = [
    { id: 'terms', label: 'Terms & Conditions', icon: FileText, href: '/client/terms-conditions' },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield, href: '/client/privacy-policy' },
    { id: 'refund', label: 'Refund Policy', icon: RefreshCw, href: '/client//refund-policy' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign, href: '/client/pricing' },
  ];

  const SectionHeader: React.FC<SectionHeaderProps> = ({ title, isExpanded, onToggle, count }) => (
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

  const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onClick }) => {
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
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
                title="Products"
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
    </div>
  );
};

export default ProfessionalSidebar;