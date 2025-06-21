import { z } from "zod";

import { basePasswordSchema, emailSchema } from "@/validators/auth";

const LoginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, "Password is required"),
    code: z.string().trim().optional(),
    remember: z.boolean().optional(),
});

export default LoginSchema;

export type RegisterType = z.infer<typeof LoginSchema>;