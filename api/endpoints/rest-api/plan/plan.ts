import { GET } from "@/api/lib/client";
import { baseUrl } from "../../url";
import { CustomResponse } from "@/interfaces/response";
import { IPlan } from "@/interfaces/plan";

const PlanbaseURL = `${baseUrl}/plan`;
export const PLAN_API = {
  GET_ALL_PLANS: async () : Promise<CustomResponse<IPlan[]>> => {
    try {
      const response = await GET(`${PlanbaseURL}/getAllPlans`);                  
      return response
    } catch (error) {
      throw error;
    }
  },

};