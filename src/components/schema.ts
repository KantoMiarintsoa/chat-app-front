import { optional, z } from "zod";

export const updateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional(),
    oldPassword: z.string().optional(),
    confirmPassword: z.string().optional()

})

export type UpdateProfileSchemaType = z.infer<typeof updateSchema>