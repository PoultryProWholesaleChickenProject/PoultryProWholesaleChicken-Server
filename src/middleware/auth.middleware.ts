import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../shared/jwt";
import { JwtPayload } from "jsonwebtoken";
import { catchAsyncFun } from "../shared/catchAsyncFun";
import { UserRoleType } from "../modules/auth/auth.interface";
import User from "../modules/user/user.model";
import { config } from "../env";
import jwt from "jsonwebtoken";

const auth = (...userRole: UserRoleType[]) => {
  return catchAsyncFun(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("Token not provided");
      }
      const secretKey = config.JWT_ACCESS_SECRET as string;

      const decoded = verifyToken(token, secretKey) as JwtPayload;
      console.log("decoded", decoded);
      const { userId, role } = decoded;
      const iat: number = decoded.iat as number;

      const user = await User.isUserExist(userId);
      console.log("user", user);
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

      if (userRole?.length && !userRole.includes(decoded?.role)) {
        throw new Error("Unauthorized 1");
      }

      req.user = decoded;
      next();
    }
  );
};

export default auth;
