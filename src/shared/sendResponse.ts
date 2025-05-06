import { Response } from "express";

type TresponseData<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
};
const sendResponse = <T>(res: Response, data: TresponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};

export default sendResponse;
