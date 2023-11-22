export type User = {
        id: number
        email: string
        dateCreated: Date
        username: string        
        zoopsWritten: Zoop[]
        zoopsReceived: Zoop[]
        faves: Fave[]
}

export interface Fave {
        id: number
        dateCreated: Date
        faverId: number
        zoopId: number
}

export interface Zoop {
        id: number
        dateCreated: Date
        dateUpdated?: Date
        content: string
        authorId: number
        receiverId: number
}

export interface ZoopWithDetails {
        receiver: User
        author: User
        id: number
        dateCreated: Date
        dateUpdated: Date
        content: string
        authorId: number
        receiverId: number
        faves: Fave[]
}