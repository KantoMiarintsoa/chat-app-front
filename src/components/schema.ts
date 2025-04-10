import { optional, z } from "zod";

export const updateSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional(),
    oldPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    profilePicture: z.any()
        .optional()
        .refine(file => !file || file instanceof FileList)
        .refine(file => !file || file.length > 0, "Select an image")
        .refine(file => {
            if (!file || file.length === 0) return true;
            const image = file[0];
            return image.size <= 2 * 1024 * 1024;
        }, "max size is 2MB")
        .refine(file => {
            if (!file || file.length === 0) return true;
            const image = file[0];
            return image.size > 0;
        }, "File empty")
        .refine(file => {
            if (!file || file.length === 0) return true;
            const image = file[0];
            return image.type.startsWith("image/");
        }, "File must be an image")
})

export type UpdateProfileSchemaType = z.infer<typeof updateSchema>