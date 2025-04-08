import { z } from "zod"
export const registerSchema = z.object({
    firstName: z.string().trim().min(2, "nom  est requis"),
    lastName: z.string().trim().min(2, " prenom est requis"),
    username: z.string().trim().min(2, "pseudo est requis"),
    email: z.string().trim().email("email est requis"),
    password: z.string().min(6, "mot de passe est requis"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "les mot de passe ne correspondent pas, veuillez ressayeer!!!!!!",
    path: ["confirmPassword"]
})

export type RegisterFormSchema = z.infer<typeof registerSchema>