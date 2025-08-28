import { POST } from "@/api/lib/client";
import { baseUrl } from "../../url";
import { IOrganizationWithUser } from "@/interfaces/organization";
const OrganizationbaseURL = `${baseUrl}/organization`;
export const ORGANIZATION_API = {
  CREATE_ORGANIZATION: async (organizationData: IOrganizationWithUser) => {
    try {
      const response = await POST(`${OrganizationbaseURL}/createOrganization`, organizationData);                  
      return response
    } catch (error) {
      throw error;
    }
  }
};
