import { ShortDetailsUser } from "./user"

export type ShowDetailsMessage = {
    sender: ShortDetailsUser
    receiver: ShortDetailsUser
    content: string;
    createdAt: string
    messageType: string
    isRead: boolean

}

export type Message = {
    sender: ShortDetailsUser
    receiver: ShortDetailsUser
    content: string
    id: number
    createdAt: string
    isRead: string
    replyMessageId: number
    replyTo: Message
}