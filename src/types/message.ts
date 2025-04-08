import { ShortDetailsUser } from "./user"

export type ShowDetailsMessage = {
    sender: ShortDetailsUser
    receiver: ShortDetailsUser
    content: string;
    createdAt: string
    messageType: string
    isRead: boolean

}