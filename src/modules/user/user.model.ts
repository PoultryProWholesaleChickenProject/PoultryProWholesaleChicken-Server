import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["super_admin", "admin", "vendor", "manager", "staff", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const UserMdel = model<IUser>("User", userSchema);

export default UserMdel;
