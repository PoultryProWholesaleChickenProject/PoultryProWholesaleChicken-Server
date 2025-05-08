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

const getme = catchAsyncFun(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error("Token not provided");
  }
  const result = await userServices.getme(token);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  getme,
  // getUser,
  // updateUser,
  // deleteUser,
};
