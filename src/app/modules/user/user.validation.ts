import z from "zod";
import { IsActive, Role } from "./user.interface.js";

export const createUserZodValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters" })
      .trim(),

    email: z
      .email() // ইমেইল ফরম্যাট চেক করবে
      .trim(),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password cannot exceed 20 characters" }),

    phone: z
      .string()
      .regex(/^[0-9+]+$/, { message: "Invalid phone number" }) // শুধু নাম্বার ও + সাপোর্ট করবে
      .min(11, { message: "Phone number must be at least 11 digits" })
      .optional(),

    address: z
      .string()
      .min(5, { message: "Address should be more descriptive" })
      .max(200, { message: "Address is too long" })
      .optional(), // যদি অ্যাড্রেস ম্যান্ডেটরি না হয়, তবে এটি দিতে পারেন
  }),
});

export const updateUserZodValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters" })
      .trim()
      .optional(),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(20, { message: "Password cannot exceed 20 characters" })
      .optional(),

    phone: z
      .string()
      .regex(/^[0-9+]+$/, { message: "Invalid phone number" })
      .min(11, { message: "Phone number must be at least 11 digits" })
      .optional(),

    role: z.enum(Object.keys(Role) as [string]).optional(),

    isActive: z.enum(Object.values(IsActive) as [string]).optional(),

    isDeleted: z
      .boolean({ message: "isDeleted must be true of false" })
      .optional(),

    isVerified: z
      .boolean({ message: "isDeleted must be true of false" })
      .optional(),

    address: z
      .string()
      .min(5, { message: "Address should be more descriptive" })
      .max(200, { message: "Address is too long" })
      .optional(),
  }),
});
