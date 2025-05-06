import jwt, { JwtPayload } from "jsonwebtoken";
interface jwtPayload {
  userId: string;
  role: string;
  needPasswordChange: boolean;
}

export const generateToken = (
  payload: JwtPayload,
  secretKey: string,
  expiresIn: string
): string => {
  return jwt.sign(payload, secretKey, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const verifyToken = (
  token: string,
  secretKey: string
): object | string => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
