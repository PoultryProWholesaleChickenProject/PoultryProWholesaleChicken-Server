import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// Route to create a new user
router.post("/", userController.createUser);

// // Route to get a user by ID
// router.get('/:id', getUser);

// // Route to update a user by ID
// router.put('/:id', updateUser);

// // Route to delete a user by ID
// router.delete('/:id', deleteUser);

const userRoutes = router;
export default userRoutes;
