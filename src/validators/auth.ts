import { z } from "zod";

export const firstNameSchema = z.string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(50, "First name cannot exceed 50 characters");

export const NameSchema = z.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters");


export const lastNameSchema = z.string()
    .trim()
    .min(3, "Last name must be at least 3 characters")
    .max(50, "Last name cannot exceed 50 characters");

export const emailSchema = z.string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim();

export const usernameSchema = z.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores');


export const genderSchema = z.enum(["male", "female", "other"])
    .optional();
// Base password requirements
export const basePasswordSchema = z.string().trim()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters");

// Strong password with additional requirements
export const strongPasswordSchema = basePasswordSchema
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

// Confirm password schema (to be used with .refine())
export const confirmPasswordSchema = z.string();

// Schema for checking password match
export const passwordMatchSchema = z.object({
    password: strongPasswordSchema,
    confirmPassword: confirmPasswordSchema
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
