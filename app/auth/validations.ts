import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

export const CreateOrUpdateListing = z
  .object({
    namep: z.string().max(0, { message: " " }).optional(),
    name: z.string(),
    category: z.string(),
    tagline: z.string().min(1).max(80),
    img: z.any(),
    imgHeight: z.number().optional(),
    logo: z.any(),
    tags: z.string().max(160).optional(),
    website: z.string().url().optional(),
    social: z.string().url().optional(),
  })
  .refine((data) => data.website || data.social, {
    message:
      "The business/app/community should have an online presence. Please enter a social URL or a website.",
    path: ["website", "social"],
  })
