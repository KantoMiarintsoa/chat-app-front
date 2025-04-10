"use server"

import { Session } from "@/types/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export async function LogoutAction() {
    (await cookies()).delete("session")
    return redirect("/login")
}

export async function getSession() {
    const session = (await cookies()).get("session")?.value
    if (!session) {
        return null;
    }
    return JSON.parse(session) as Session
}

export async function updateSession(session: Session | null) {
    if (!session) {
        return ((await cookies()).delete("session"))
    }

    ((await cookies()).set("session", JSON.stringify(session),
        {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict"
        }))
}
