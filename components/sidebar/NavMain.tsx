import { FC } from "react";
import { FileText, Shield, RefreshCw, DollarSign } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const NavPolicies: FC = () => {
  const pathname = usePathname();

  // Helper function to check if a route is active
  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-medium">
        Policies
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive("/terms-and-conditions")}
            className="h-6 px-2"
          >
            <Link
              href="/terms-and-conditions"
              className="flex items-center gap-1.5 w-full text-[10px]"
            >
              <FileText className="size-2.5" />
              <span>Terms & Conditions</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive("/privacy-policy")}
            className="h-6 px-2"
          >
            <Link
              href="/privacy-policy"
              className="flex items-center gap-1.5 w-full text-[10px]"
            >
              <Shield className="size-2.5" />
              <span>Privacy Policy</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive("/refund-policy")}
            className="h-6 px-2"
          >
            <Link
              href="/refund-policy"
              className="flex items-center gap-1.5 w-full text-[10px]"
            >
              <RefreshCw className="size-2.5" />
              <span>Refund Policy</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive("/pricing")}
            className="h-6 px-2"
          >
            <Link
              href="/pricing"
              className="flex items-center gap-1.5 w-full text-[10px]"
            >
              <DollarSign className="size-2.5" />
              <span>Pricing</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavPolicies;