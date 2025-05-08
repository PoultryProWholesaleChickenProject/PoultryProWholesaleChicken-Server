import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});
export const passwordChangeSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  }),
});

const refrashTokenSchema = z.object({
  cookie: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});
const forgetPassword = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
  }),
});
const resetPassword = z.object({
  body: z.object({
    userId: z.string().min(1, "User ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});
export const authValidation = {
  loginSchema,
  passwordChangeSchema,
  refrashTokenSchema,
  forgetPassword,
  resetPassword,
};
