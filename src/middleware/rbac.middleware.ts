import { Request, Response, NextFunction } from "express";
import { Roles } from "../constants/role";

export const rbac = (roles: (typeof Roles)[keyof typeof Roles][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // Assuming user role is attached to the request object

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
