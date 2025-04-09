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