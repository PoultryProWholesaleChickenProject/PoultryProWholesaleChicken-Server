import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validationMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        cookie: req.cookies,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validationMiddleware;
