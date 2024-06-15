export interface PostUser {
    username: string
    displayName: string
    userId: string
    profilePictureUrl?: string
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

export const examplePost: Post = {
    id: 1,
    user: {
        username: 'alex.johnathan01',
        displayName: 'Alex Johnathan',
        userId: '00123',
    },
    content: 'I love how all people on the internet always get pissed for no reason over the most ridiculous shit ever',
    media: {
        // imageUrl: 'http://example.com/image.jpg',
        // videoUrl: 'http://example.com/video.mp4',
        // linkUrl can be included if there's a link in the content
    },
    metadata: {
        timestamp: new Date(),
        location: 'Constanța, Romania', // Optional
    },
    engagement: {
        reposts: 10,
        likes: 100,
        comments: 5,
    },
    hashtags: ['#example', '#typescript'],
    mentions: ['@anotheruser'],
}
