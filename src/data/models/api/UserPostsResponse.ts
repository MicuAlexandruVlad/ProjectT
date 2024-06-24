import { PostUser } from "../Post"

export default interface UserPostsResponse {
    message: string
    posts: Post[]
}

interface Post {
    keys: string[]
    length: number
    _fields: [PostField, PostUser]
    _fieldLookup: FieldLookup
}

interface Field {
    identity: Identity
    labels: string[]
    elementId: string
}

export interface PostField extends Field {
    properties: PostProperties
}

interface Identity {
    low: number
    high: number
}

interface PostProperties {
    metadata: string
    engagement: string
    hashtags: any[]
    mentions: any[]
    media: string
    userId: number
    content: string
    createdAt: number
}

interface FieldLookup {
    [key: string]: number
}
