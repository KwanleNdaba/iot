import { FC, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";

// Mock data types
interface Organisation {
  id: number;
  name: string;
  status: string;
  createdAt: string;
  subscriptions: any[];
  hasActiveSubscription: boolean;
}

// Mock organizations data
const mockOrganisations: Organisation[] = [
  {
    id: 1,
    name: "TechCorp Solutions",
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    subscriptions: [],
    hasActiveSubscription: true,
  },
  {
    id: 2,
    name: "DataFlow Inc",
    status: "active",
    createdAt: "2024-02-20T14:30:00Z",
    subscriptions: [],
    hasActiveSubscription: true,
  },
  {
    id: 3,
    name: "Legacy Systems",
    status: "inactive",
    createdAt: "2023-11-10T09:15:00Z",
    subscriptions: [],
    hasActiveSubscription: false,
  },
  {
    id: 4,
    name: "Startup Hub",
    status: "active",
    createdAt: "2024-03-05T16:45:00Z",
    subscriptions: [],
    hasActiveSubscription: true,
  },
];

// Mock Create Organisation Dialog Component
const CreateOrganisationDialog: FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}> = ({ open, onOpenChange, onComplete }) => {
  // This is a placeholder - in a real app you'd have a proper dialog
  if (open) {
    console.log("Create Organisation Dialog would open here");
    // Auto-close after a brief moment for demo purposes
    setTimeout(() => {
      onComplete();
    }, 1000);
  }
  return null;
};

const TeamSwitcher: FC = () => {
  const { isMobile } = useSidebar();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // Mock organization store state
  const [organisations] = useState<Organisation[]>(mockOrganisations);
  const [selectedOrganisation, setSelectedOrganisation] = useState<Organisation | null>(
    mockOrganisations[0] // Default to first organization
  );
  const [isLoading] = useState(false); // Set to true to test loading state

  const activeTeam = selectedOrganisation ||
    organisations[0] || {
      name: "No Organization",
      id: 0,
      status: "inactive",
      createdAt: "",
      subscriptions: [],
      hasActiveSubscription: false,
    };

  // Mock function to handle organization selection
  const handleSetSelectedOrganisation = (org: Organisation) => {
    setSelectedOrganisation(org);
    console.log(`Selected organization: ${org.name}`);
  };

  // Show skeleton while loading
  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <Skeleton className="flex aspect-square size-8 rounded-lg" />
            <div className="grid flex-1 text-left text-sm leading-tight gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <ChevronsUpDown className="ml-auto opacity-50" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <span className="text-xs font-semibold">
                    {activeTeam.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeTeam.name}
                  </span>
                  <span className="truncate text-xs">
                    {activeTeam.hasActiveSubscription ? "Active" : "Inactive"}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Organizations
              </DropdownMenuLabel>
              {organisations.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => handleSetSelectedOrganisation(org)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <span className="text-xs font-medium">
                      {org.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{org.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {org.hasActiveSubscription ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <DropdownMenuShortcut>
                    ⌘{organisations.indexOf(org) + 1}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2"
                onClick={() => setShowCreateDialog(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add organization
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <CreateOrganisationDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onComplete={() => {
          setShowCreateDialog(false);
        }}
      />
    </>
  );
};

export default TeamSwitcher;