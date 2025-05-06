import status from "http-status";
import { catchAsyncFun } from "../../shared/catchAsyncFun";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { config } from "../../env";
import { verifyToken } from "../../shared/jwt";
import { JwtPayload } from "jsonwebtoken";
import User from "../user/user.model";

const login = catchAsyncFun(async (req, res, next) => {
  console.log("Login route HIT ✅");
  const loginData = req.body;
  console.log("loginData", loginData);
  const { accessToken, refreshToken } = await AuthService.login(loginData);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: accessToken,
  });
});
const changePassword = catchAsyncFun(async (req, res, next) => {
  const newData = req.body;

  if (!req.user) {
    throw new Error("User not found");
  }

  const { accessToken, refreshToken } = await AuthService.changePassword(
    req.user,
    newData
  );

  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "password change in successfully",
    data: accessToken,
  });
});

const refreshToken = catchAsyncFun(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  const secretKey = config.JWT_REFRESH_SECRET as string;

  const decoded = verifyToken(token, secretKey) as JwtPayload;
  console.log("decoded", decoded);
  const { userId } = decoded;
  const iat: number = decoded.iat as number;

  const user = await User.isUserExist(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user?.isDeleted === true) {
    throw new Error("User is deleted");
  }

  if (user?.isActive === "blocked" || user?.isActive === "inactive") {
    throw new Error("User is blocked");
  }

  if (
    user?.passwordChangeAt &&
    User.isPasswordTimestampValid(user?.passwordChangeAt, iat)
  ) {
    throw new Error("Password has been changed");
  }

  const { accessToken, refreshToken } = await AuthService.refreshToken(
    user,
    token
  );

  console.log("refreshToken", refreshToken);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "password change in successfully",
    data: accessToken,
  });
});

export const AuthController = {
  login,
  changePassword,
  refreshToken,
};
