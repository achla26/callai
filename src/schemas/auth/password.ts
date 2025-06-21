import { basePasswordSchema, emailSchema, passwordMatchSchema } from "@/validators/auth";
import { z } from "zod";


/*----------------------------------*
 * FORGOT PASSWORD SCHEMA VALIDATION START
 *----------------------------------*/
const ForgotPasswordSchema = z.object({
    email: emailSchema
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

/*----------------------------------*
 * RESET PASSWORD SCHEMA VALIDATION START
 *----------------------------------*/
const ResetPasswordSchema = z.object({
    password: basePasswordSchema,
    confirmPassword: z.string(),
}).and(passwordMatchSchema);

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export {
    ForgotPasswordSchema, ResetPasswordSchema
};
export type { ForgotPasswordFormData, ResetPasswordFormData };