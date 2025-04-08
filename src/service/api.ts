import { LoginSchemaType } from "@/app/login/components/shema"
import { RegisterFormSchema } from "@/app/register/components/schema"
import { ShowDetailsMessage } from "@/types/message"
import { PaginationResponse } from "@/types/pagination"
import { Session, User } from "@/types/user"
import axios from "axios"
import { cookies } from "next/headers"

export const API_URL = process.env.API_URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
})
api.interceptors.request.use(async config => {
    const session = (await cookies()).get("session")?.value
    if (session) {
        const token = (JSON.parse(session) as Session).access_token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export const login = async (data: LoginSchemaType) => {
    const response = await api.post<Session>("auth/login", data)
    return response.data
}
export const register = async ({ confirmPassword, ...data }: RegisterFormSchema) => {
    const response = await api.post<User>("users/register", data)

}

export async function getUsers(page: number = 1) {
    return await api.get<PaginationResponse<ShowDetailsMessage>>(`chat/last-users-messages?pages=${page}`)
}

