import { Roles } from "../../constants/role";
export interface TloginInput {
  userId: string;
  password: string;
}
export interface TchangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export type UserRoleType = keyof typeof Roles;
