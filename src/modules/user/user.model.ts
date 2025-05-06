import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser, UserModel>(
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
      select: 0,
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
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangeAt: Date,
    isActive: {
      type: String,
      enum: ["blocked", "active", "inactive"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExist = async function (
  userId: string
): Promise<IUser | null> {
  return await this.findOne({ userId: userId });
};

userSchema.statics.isPasswordTimestampValid = function (
  passwordChangeAt: Date,
  jwtTimestamp: number
): boolean {
  const passwordChangeTimestamp = passwordChangeAt.getTime() / 1000;
  console.log(passwordChangeTimestamp > jwtTimestamp);
  return passwordChangeTimestamp > jwtTimestamp;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
