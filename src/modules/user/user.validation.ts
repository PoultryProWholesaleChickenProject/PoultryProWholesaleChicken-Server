import { z } from "zod";

export const userValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "User ID is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    role: z
      .enum(
        ["super_admin", "admin", "vendor", "manager", "staff", "customer"],
        {
          required_error: "Role is required",
        }
      )
      .default("customer"),
  }),
});

export const userValidation = {
  createUser: userValidationSchema,
};
