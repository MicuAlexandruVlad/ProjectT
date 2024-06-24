export default interface UserPostsResponse {
    message: string
    posts: Post[]
}

interface Post {
    keys: string[]
    length: number
    _fields: Field[]
    _fieldLookup: FieldLookup
}

interface Field {
    identity: Identity
    labels: string[]
    properties: Properties
    elementId: string
}

interface Identity {
    low: number
    high: number
}

interface Properties {
    metadata: string
    engagement: string
    hashtags: any[]
    mentions: any[]
    media: string
    userId: number
    content: string
    user: string
    timestamp: number
}

interface FieldLookup {
    [key: string]: number
}
