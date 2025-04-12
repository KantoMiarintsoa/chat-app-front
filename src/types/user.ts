export type User = {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    id: number,
    profilePicture?: string,
    nickName?: string
}

export type Session = {
    access_token: string,
    user: User
}

export type ShortDetailsUser = {
    id: number
    email: string
    username: string
    profilePicture: string | undefined
    nickName?: string

}