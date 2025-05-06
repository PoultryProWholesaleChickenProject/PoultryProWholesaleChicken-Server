import User from "./user.model";
import { IUser } from "./user.interface";
import { hash, compare } from "bcrypt";
import { config } from "../../env";
import { hashPassword } from "../../shared/hashAndCompare.password";

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

export const userServices = {
  createUser,
};
