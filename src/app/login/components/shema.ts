import { z } from "zod";
export const loginSchema = z.object({
    email: z.string().email("email est requis"),
    password: z.string().min(2, "le mot de passe est requis")
})

export type LoginSchemaType = z.infer<typeof loginSchema>