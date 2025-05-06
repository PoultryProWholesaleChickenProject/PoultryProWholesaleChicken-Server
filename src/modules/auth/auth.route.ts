import { Router } from "express";
import validationMiddleware from "../../middleware/validation.middleware";
import { AuthController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import auth from "../../middleware/auth.middleware";
import { Roles } from "../../constants/role";

const router = Router();

// Route for user login
router.post(
  "/login",
  validationMiddleware(authValidation.loginSchema),
  AuthController.login
);
router.post(
  "/refresh-token",
  validationMiddleware(authValidation.refrashTokenSchema),
  AuthController.refreshToken
);
router.post(
  "/change-password",
  auth(
    Roles.admin,
    Roles.super_admin,
    Roles.customer,
    Roles.manager,
    Roles.vendor,
    Roles.staff
  ),
  validationMiddleware(authValidation.passwordChangeSchema),
  AuthController.changePassword
);

const authRoutes = router;
export default authRoutes;
