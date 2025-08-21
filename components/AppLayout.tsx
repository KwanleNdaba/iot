"use client";
import { FC, ReactNode, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SidebarInset, SidebarTrigger, Sidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Loader from "@/components/ui/loader";
import AppSidebar from "./sidebar/AppSidebar";
import NotificationBell from "./notifications/NotificationBell";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Mock state - you can adjust these values
  const [isLoading] = useState(false); // Set to true to test loading state
  const [authenticated] = useState(true); // Set to false to test unauthenticated state

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
    <>
      {/* Use the Sidebar component from the UI library */}
      <Sidebar>
        <AppSidebar />
      </Sidebar>
      
      {/* Main Content Area */}
      <SidebarInset>
        {/* Fixed Notification Bell */}
        <div className="absolute top-5 right-5 flex justify-center items-center z-10">
          <NotificationBell />
        </div>
        
        {/* Fixed Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <div key={breadcrumb.href} className="flex items-center">
                    {index > 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem className="hidden md:block">
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={breadcrumb.href}>{breadcrumb.title}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 p-4 pt-4 pb-16">
            {authenticated && isLoading ? (
              <div className="flex items-center justify-center flex-1 min-h-[400px]">
                <Loader text="Loading application data..." size="lg" />
              </div>
            ) : (
              children
            )}
          </div>
        </div>
        
        {/* Fixed Footer */}
        <div className="shrink-0 py-1 text-sm font-thin bg-gray-100 border-t">
          <div className="flex justify-between px-3">
            <p className="text-muted-foreground">
              &copy; 2025 Smart Sensor Flow LLC
            </p>
            <p className="text-muted-foreground">v4.3.1.3PAAS</p>
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default AppLayout