"use client";
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import AccessRestrictionCard from "./AccessRestrictionCard";
import { CreateRoleRequest, CreateRoleTabProps } from "@/interfaces/permissions";

const CreateRoleTab: FC<CreateRoleTabProps> = ({
  organisationId,
  onRoleCreated,
  isOwner,
  isLoading,
}) => {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }

    setIsCreating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const request: CreateRoleRequest = {
        roleName: roleName.trim(),
        roleDescription: roleDescription.trim(),
        organisationId,
      };

      console.log("Creating role:", request);
      toast.success("Role created successfully");
      setRoleName("");
      setRoleDescription("");
      onRoleCreated();
    } catch (error) {
      console.error("Failed to create role:", error);
      toast.error("Failed to create role");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOwner) {
    return (
      <AccessRestrictionCard 
        message="Only organization owners can create roles."
      />
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Plus className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Create New Role</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Create a new role for this organization. You can assign permissions to it in the next tab.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName" className="text-sm font-medium text-gray-700">
              Role Name
            </Label>
            <Input
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter role name"
              disabled={isLoading || isCreating}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="roleDescription" className="text-sm font-medium text-gray-700">
              Role Description
            </Label>
            <Textarea
              id="roleDescription"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="Enter role description"
              rows={3}
              disabled={isLoading || isCreating}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Button
            onClick={handleCreate}
            disabled={isLoading || isCreating || !roleName.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {isCreating ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoleTab;