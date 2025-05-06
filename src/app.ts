// src/app.ts
import express from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalError.middleware";
import routes from "./routes"; // Import routes
import notFoundHandler from "./middleware/notFound.middleware";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

// Centralized Routes from the array in `routes.ts`
app.use("/api", routes);

app.use(globalErrorHandler);
app.use(notFoundHandler);
export default app;
