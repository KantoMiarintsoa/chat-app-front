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
    isRead: boolean
    replyMessageId: number
    replyTo: Message
    isSender: boolean
    messageType: string
} 