import { FC, useState } from "react";
import {
  Settings,
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

// Mock data types
interface Module {
  id: string;
  name: string;
  description: string;
}

interface Organisation {
  id: number;
  name: string;
  hasActiveSubscription: boolean;
  modules: Module[];
}

// Mock data
const mockOrganisations: Organisation[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    hasActiveSubscription: true,
    modules: [
      { id: "1", name: "IoT Dashboard", description: "IoT monitoring dashboard" },
      { id: "2", name: "Data Analytics", description: "Advanced analytics platform" },
      { id: "3", name: "Device Manager", description: "Device management system" },
    ],
  },
  {
    id: 2,
    name: "DataFlow Inc",
    hasActiveSubscription: true,
    modules: [
      { id: "4", name: "Sensor Hub", description: "Sensor data collection" },
      { id: "5", name: "Alert System", description: "Real-time alerting" },
    ],
  },
  {
    id: 3,
    name: "Legacy Systems",
    hasActiveSubscription: false,
    modules: [],
  },
];

const NavProjects: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Mock organization store state
  const [organisations] = useState<Organisation[]>(mockOrganisations);
  const [selectedOrganisation] = useState<Organisation | null>(
    mockOrganisations.find(org => org.hasActiveSubscription) || null
  );

  // Helper function to check if a route/component is active
  const isActive = (route: string, component?: string) => {
    if (component) {
      return (
        pathname === route &&
        searchParams.get("component") === component
      );
    }
    return (
      pathname === route &&
      !searchParams.get("component")
    );
  };

  // Check if user has active subscription access
  // This matches the same logic used in HomeComponent
  const hasActivePayingAccess = (() => {
    if (selectedOrganisation) {
      return selectedOrganisation.hasActiveSubscription;
    }
    return organisations.some((org) => org.hasActiveSubscription);
  })();

  // Only show organization and products sections if user has active subscription
  const hasOrganizations = organisations.length > 0 && hasActivePayingAccess;

  return (
    <>
      {hasOrganizations && (
        <>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs">
              {selectedOrganisation
                ? selectedOrganisation.name
                : "Organizations"}
            </SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organization", "admin")}
                  size="sm"
                >
                  <Link
                    href="/organization?component=admin"
                    className="flex items-center gap-2 w-full text-xs"
                  >
                    <Settings className="size-3" />
                    <span>Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organization", "dashboard")}
                  size="sm"
                >
                  <Link
                    href="/organization?component=dashboard"
                    className="flex items-center gap-2 w-full text-xs"
                  >
                    <BarChart3 className="size-3" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organization", "users")}
                  size="sm"
                >
                  <Link
                    href="/organization?component=users"
                    className="flex items-center gap-2 w-full text-xs"
                  >
                    <Users className="size-3" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/organization", "permissions")}
                  size="sm"
                >
                  <Link
                    href="/organization?component=permissions"
                    className="flex items-center gap-2 w-full text-xs"
                  >
                    <Lock className="size-3" />
                    <span>Permissions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-xs">Products</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/products", "my-products")}
                  size="sm"
                >
                  <Link
                    href="/products?component=my-products"
                    className="flex items-center gap-2 w-full text-xs"
                  >
                    <Package className="size-3" />
                    <span>
                      My Products
                      {selectedOrganisation
                        ? ` (${selectedOrganisation.modules.length})`
                        : ""}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/products", "all-products")}
                  size="sm"
                >
                  <Link
                    href="/products?component=all-products"
                    className="flex items-center gap-2 w-full text-xs"
                  >
                    <ShoppingCart className="size-3" />
                    <span>All Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </>
      )}
    </>
  );
};

export default NavProjects;