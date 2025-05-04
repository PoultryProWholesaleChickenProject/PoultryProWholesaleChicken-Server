import UserModel from "./user.model";
import { IUser } from "./user.interface";
import { hash, compare } from "bcrypt";

const createUser = async (userData: IUser): Promise<IUser> => {
  try {
    const hashedPassword = await hash(userData.password, 10);
    const newUser = UserModel.create({
      ...userData,
      password: hashedPassword,
    });
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
