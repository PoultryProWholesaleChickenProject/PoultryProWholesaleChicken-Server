import { Jwt, JwtPayload } from "jsonwebtoken";
import {
  comparePassword,
  hashPassword,
} from "../../shared/hashAndCompare.password";
import { generateToken, verifyToken } from "../../shared/jwt";
import User from "../user/user.model";
import { TchangePasswordInput, TloginInput } from "./auth.interface";
import { config } from "../../env";
import { IUser } from "../user/user.interface";
import sendEmail from "../../shared/sendMail";
const login = async (payload: TloginInput) => {
  // Simulate a login process
  const { userId, password } = payload;
  const user = await User.findOne({ userId: userId }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  const isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) {
    throw new Error("Unauthorized");
  }

  if (user.isDeleted === true) {
    throw new Error("User is deleted");
  }

  if (user.isActive === "blocked" || user.isActive === "inactive") {
    throw new Error("User is blocked");
  }

  console.log(user.needPasswordChange);
  const accessToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: user.needPasswordChange,
    },
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string
  );

  const refreshToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: true,
    },
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const changePassword = async (
  userData: JwtPayload,
  payload: TchangePasswordInput
) => {
  // Simulate a login process
  const { userId, role } = userData;
  const { oldPassword, newPassword } = payload;
  const user = await User.findOne({ userId: userId }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }
  const isValidPassword = await comparePassword(oldPassword, user.password);
  if (!isValidPassword) {
    throw new Error("Unauthorized");
  }

  if (user.role !== role) {
    throw new Error("Unauthorized");
  }
  if (user.isDeleted === true) {
    throw new Error("User is deleted");
  }

  if (user.isActive === "blocked" || user.isActive === "inactive") {
    throw new Error("User is blocked");
  }

  const hashedPassword = await hashPassword(
    newPassword,
    config.BCRYPT_SALT_ROUNDS
  );

  const updatedUser = await User.findOneAndUpdate(
    { userId: user.userId },
    {
      password: hashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );

  const accessToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: false,
    },
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string
  );

  const refreshToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: false,
    },
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (user: IUser, token: string) => {
  const accessToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: false,
    },
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string
  );

  const refreshToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: false,
    },
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const forgotPassword = async (user: IUser) => {
  const resetToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: false,
    },
    config.JWT_ACCESS_SECRET as string,
    "15m"
  );

  const resetUrl = `${config.FRONTEND_URL}?userId=${user.userId}&token=${resetToken}`;
  sendEmail(user.email, resetUrl);
  console.log("resetUrl", resetUrl);
};

const resetPassword = async (
  payload: { userId: string; password: string },
  token: string
) => {
  console.log("payload", payload);
  const decoded = verifyToken(
    token,
    config.JWT_ACCESS_SECRET as string
  ) as JwtPayload;
  const { userId } = decoded;
  const user = await User.findOne({ userId: userId }).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  if (user.userId !== payload.userId) {
    throw new Error("Unauthorized");
  }

  if (user.isDeleted === true) {
    throw new Error("User is deleted");
  }

  if (user.isActive === "blocked" || user.isActive === "inactive") {
    throw new Error("User is blocked");
  }

  const hashedPassword = await hashPassword(
    payload.password,
    config.BCRYPT_SALT_ROUNDS
  );
  const updatedUser = await User.findOneAndUpdate(
    { userId: user.userId },
    {
      password: hashedPassword,
      needPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );

  const accessToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: user.needPasswordChange,
    },
    config.JWT_ACCESS_SECRET as string,
    config.JWT_ACCESS_EXPIRES_IN as string
  );

  const refreshToken = generateToken(
    {
      userId: user.userId,
      role: user.role,
      needPasswordChange: false,
    },
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  login,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
