// src/app.ts
import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalError.middleware";
import routes from "./routes"; // Import routes
import notFoundHandler from "./middleware/notFound.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Centralized Routes from the array in `routes.ts`
app.use(routes);

// Not Found Handler
app.use(notFoundHandler);
// Global Error Handler
app.use(globalErrorHandler);

export default app;
