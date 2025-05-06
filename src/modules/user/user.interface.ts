import { Model } from "mongoose";
import { Roles } from "../../constants/role";

export interface IUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangeAt: Date;
  role: "super_admin" | "admin" | "vendor" | "manager" | "staff" | "customer";
  isActive: "blocked" | "active" | "inactive";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  userId: string;
  name: string;
  email: string;
  password: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  password?: string;
}

export interface UserModel extends Model<IUser> {
  isUserExist(userId: string): Promise<IUser | null>;
  isPasswordTimestampValid(
    passwordChangeAt: Date,
    jwtTimestamp: number
  ): boolean;
}
