export interface PostUser {
    username: string
    displayName: string
    userId: string
    profilePictureUrl: string
}
  
export interface Media {
    imageUrl?: string
    videoUrl?: string
    linkUrl?: string
}

export interface Engagement {
    reposts: number
    likes: number
    comments: number
}

export default interface Post {
    id: number
    user: PostUser
    content: string
    media?: Media
    metadata: {
        timestamp: Date
        location?: string
    }
    engagement: Engagement
    hashtags?: string[]
    mentions?: string[]
}
