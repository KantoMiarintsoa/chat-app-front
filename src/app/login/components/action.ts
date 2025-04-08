"use server"
import { login } from "@/service/api";
import { LoginSchemaType } from "./shema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginSchemaType) {
    try {
        const credential = await login(data);
        (await cookies()).set("session", JSON.stringify(credential), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
        })

    }
    catch (errors: any) {
        return { errors: "email ou mot de passe invalide" }
    }

    return redirect("/messages")
}