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
  "/forget-password",
  validationMiddleware(authValidation.forgetPassword),
  AuthController.forgotPassword
);
router.post(
  "/reset-password",
  validationMiddleware(authValidation.resetPassword),
  AuthController.resetPassword
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

// http://localhost:3000?userId=005&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMDUiLCJyb2xlIjoiY3VzdG9tZXIiLCJuZWVkUGFzc3dvcmRDaGFuZ2UiOmZhbHNlLCJpYXQiOjE3NDY2MDM0MzgsImV4cCI6MTc0NjYwNDMzOH0.82PE29WZIkhub7s9_ZMAOMS6Dl3UMXC_XncqUSVq4D0
