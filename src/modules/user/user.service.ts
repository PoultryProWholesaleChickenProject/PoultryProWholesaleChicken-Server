import User from "./user.model";
import { IUser } from "./user.interface";
import { hash, compare } from "bcrypt";
import { config } from "../../env";
import { hashPassword } from "../../shared/hashAndCompare.password";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../shared/jwt";

const createUser = async (userData: IUser) => {
  const isUserExits = await User.exists({ userId: userData.userId });
  if (isUserExits) {
    throw new Error("User already exists");
  }

  try {
    const hashedPassword = await hashPassword(
      userData.password,
      config.BCRYPT_SALT_ROUNDS
    );
    const newUser = User.create({
      ...userData,
      password: hashedPassword,
    });
    (await newUser).password = undefined as unknown as string;
    if (!newUser) {
      throw new Error("User creation failed");
    }
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: user creation failed");
  }
};

const getme = async (token: string) => {
  const secretKey = config.JWT_ACCESS_SECRET as string;

  const decoded = verifyToken(token, secretKey) as JwtPayload;
  console.log("decoded", decoded);
  const { userId, role } = decoded;

  const result = null;
  // if (role === "admin") {
  //   result = await Admin.findOne({ userId: userId });
  // }else if (role === "manager") {
  //   result = await Manager.findOne({ userId: userId });
  // }else if (role === "staff") {
  //   result = await Staff.findOne({ userId: userId });
  // }else if (role === "customer") {
  //   result = await Customer.findOne({ userId: userId })
  // }else if (role === "vendor") {
  //   result = await Vendor.findOne({ userId: userId });
  // }
  // if (!result) {
  //   throw new Error("User not found");
  // }

  return result;
};

export const userServices = {
  createUser,
  getme,
};
