import { Router } from "express";
import { userController } from "./user.controller";
import validationMiddleware from "../../middleware/validation.middleware";
import { userValidationSchema } from "./user.validation";
import auth from "../../middleware/auth.middleware";
import { Roles } from "../../constants/role";

const router = Router();

// Route to create a new user
router.post(
  "/create-user", // updated path
  validationMiddleware(userValidationSchema),
  userController.createUser
);
router.post(
  "/create-manager",
  auth(Roles.customer, Roles.admin), // updated path
  validationMiddleware(userValidationSchema),
  userController.createUser
);
// // Route to get a user by ID
// router.get('/:id', getUser);

// // Route to update a user by ID
// router.put('/:id', updateUser);

// // Route to delete a user by ID
// router.delete('/:id', deleteUser);

const userRoutes = router;
export default userRoutes;
