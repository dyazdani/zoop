import type { User as UserFromPrisma} from '@prisma/client';

export type User = Omit<UserFromPrisma, "password">;

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
