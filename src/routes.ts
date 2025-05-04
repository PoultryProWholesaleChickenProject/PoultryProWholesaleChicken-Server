// src/routes.ts
import { Router } from "express";
import userRoutes from "./modules/user/user.route";
// import authRoutes from "./modules/auth/auth.route"; // Uncomment when needed

// Define an array of route objects
const routes = [
  {
    path: "/",
    method: "get",
    handler: (req: any, res: { send: (arg0: string) => any }) =>
      res.send("API is working ✅"),
  },
  { path: "/api/users", method: "use", handler: userRoutes },
  // { path: "/api/auth", method: "use", handler: authRoutes } // Uncomment when needed
];

// Dynamically create the router
const router = Router();

routes.forEach((route) => {
  if (route.method === "get") {
    router.get(route.path, route.handler);
  } else if (route.method === "use") {
    router.use(route.path, route.handler);
  }
});

export default router;
