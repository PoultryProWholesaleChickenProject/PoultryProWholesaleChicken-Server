import dotenv from "dotenv";
dotenv.config();
export const config = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI || "mongodb://localhost:27017/mydatabase",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_ID: process.env.MAIL_ID,
  MAIL_HOST: process.env.MAIL_HOST,

  // Add other environment variables as needed
};
