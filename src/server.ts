import connectDB from "./config/db";
import { config } from "./env";
import app from "./app";

const PORT = config.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
};

startServer();
