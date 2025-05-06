import { Request, Response } from "express";

import { IUser } from "./user.interface";
import { userServices } from "./user.service";
import { catchAsyncFun } from "../../shared/catchAsyncFun";
import sendResponse from "../../shared/sendResponse";
import status from "http-status";

const createUser = catchAsyncFun(async (req, res, next) => {
  const userData: IUser = req.body;
  const newUser = await userServices.createUser(userData);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "User created successfully",
    data: newUser,
  });
});

// export const getUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const userId = req.params.id;
//         const user = await userService.getUserById(userId);
//         if (!user) {
//             res.status(404).json({ message: 'User not found' });
//             return;
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving user', error });
//     }
// };

// export const updateUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const userId = req.params.id;
//         const userData: User = req.body;
//         const updatedUser = await userService.updateUser(userId, userData);
//         if (!updatedUser) {
//             res.status(404).json({ message: 'User not found' });
//             return;
//         }
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user', error });
//     }
// };

// export const deleteUser = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const userId = req.params.id;
//         const result = await userService.deleteUser(userId);
//         if (!result) {
//             res.status(404).json({ message: 'User not found' });
//             return;
//         }
//         res.status(204).send();
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user', error });
//     }
// };

export const userController = {
  createUser,
  // getUser,
  // updateUser,
  // deleteUser,
};
