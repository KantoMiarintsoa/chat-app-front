"use server"

import { register } from "@/service/api";
import { RegisterFormSchema } from "./schema";
import { redirect } from "next/navigation";



export async function reigsterAction(data: RegisterFormSchema) {
    try {
        const responseData = await register(data);
    }
    catch (errors: any) {
        console.log(errors)
        return { errors: "donnees invalides" }
    }
    return redirect("/login")

}

