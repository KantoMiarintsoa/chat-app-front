export type User = {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    id: number
}

export type Session = {
    access_token: string,
    user: User
}

export type ShortDetailsUser = {
    id: number
    email: string
    username: string
}