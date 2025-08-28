import { POST } from "@/api/lib/client";
import { baseUrl } from "../../url";

import { jwtDecode } from "jwt-decode";
import { IDecodedJWT, IUserLogin, TokenData } from "@/interfaces/user";
import { CustomResponse } from "@/interfaces/response";

const AuthbaseURL = `${baseUrl}/auth`;


export const AUTH_API = {
  LOGIN_POST: async (userData: IUserLogin) => {
    try {
      const response = await POST(`${AuthbaseURL}/login`, userData);                 
      return response
    } catch (error) {
      throw error;
    }
  },

  SEND_OTP: async (data: any) => {
    try {
      const response = await POST(`${AuthbaseURL}/send-otp`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
  ,
  VERIFY_OTP: async (data: any): Promise<CustomResponse<TokenData>> => {
    try {
      const response = await POST(`${AuthbaseURL}/verify-otp`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  UPDATE_PASSWORD: async (data: any): Promise<CustomResponse<TokenData>> => {
    try {
      const response = await POST(`${AuthbaseURL}/update-password`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
