// src/routes.ts
import { Router } from "express";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";

const router = Router();
// Define an array of route objects
const routes = [
  { path: "/users", routeName: userRoutes },
  { path: "/auth", routeName: authRoutes },
];

// Dynamically create the router

routes.forEach((route) => {
  router.use(route.path, route.routeName);
});

export default router;
