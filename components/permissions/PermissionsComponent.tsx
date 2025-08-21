"use client";
import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import CreateRoleTab from "./CreateRoleTab";
import AssignPermissionsTab from "./AssignPermissionsTab";
import AssignRoleToUsersTab from "./AssignRoleToUsersTab";
import ExistingRolesTable from "./ExistingRolesTable";
import { Organisation } from "@/interfaces/permissions";
import { mockSelectedOrganisation } from "./data";
import { usePermissionsData } from "@/hooks/permissions";
import AccessRestrictionCard from "./AccessRestrictionCard";

const PermissionsComponent: FC = () => {
  const [selectedOrganisation] = useState<Organisation | null>(mockSelectedOrganisation);
  const [activeTab, setActiveTab] = useState("create-role");

  const {
    permissions,
    roles,
    users,
    isLoading,
    refetchData
  } = usePermissionsData(selectedOrganisation);

  const isOrganisationOwner = selectedOrganisation?.isOwner || false;

  if (!selectedOrganisation) {
    return (
      <div className="w-full max-w-none">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Organization Permissions
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Please select an organization to manage permissions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isOrganisationOwner) {
    return (
      <div className="w-full max-w-none">
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Organization Permissions
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Manage roles and permissions for {selectedOrganisation.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <AccessRestrictionCard 
            title="Access Restricted"
            message="Only organization owners can manage roles and permissions. Contact the organization owner to request changes."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Organization Permissions
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Manage roles and permissions for {selectedOrganisation.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="create-role" 
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
            >
              1. Create Role
            </TabsTrigger>
            <TabsTrigger 
              value="assign-permissions"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
            >
              2. Assign Permissions
            </TabsTrigger>
            <TabsTrigger 
              value="assign-users"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-medium"
            >
              3. Assign to Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create-role" className="space-y-6">
            <CreateRoleTab
              organisationId={selectedOrganisation.id}
              onRoleCreated={refetchData}
              isOwner={isOrganisationOwner}
              isLoading={isLoading}
            />
            <ExistingRolesTable roles={roles} />
          </TabsContent>

          <TabsContent value="assign-permissions" className="space-y-6">
            <AssignPermissionsTab
              roles={roles}
              permissions={permissions}
              onPermissionAssigned={refetchData}
              isOwner={isOrganisationOwner}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="assign-users" className="space-y-6">
            <AssignRoleToUsersTab
              users={users}
              roles={roles}
              onRoleAssigned={refetchData}
              isOwner={isOrganisationOwner}
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PermissionsComponent;