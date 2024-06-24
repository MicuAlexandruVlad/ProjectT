export interface PostUser {
    username: string
    displayName: string
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

export interface UnuploadedPost {
    userId: number
    content: string
    media?: Media
    metadata: {
        location?: string
    }
    hashtags?: string[]
    mentions?: string[]
    createdAt: number
}

export interface Post extends UnuploadedPost {
    id: number
    engagement: Engagement
    user: PostUser
}

export const examplePost: Post = {
    id: 1,
    userId: 4,
    user: {
        username: 'alex.johnathan01',
        displayName: 'Alex Johnathan',
    },
    content: 'I love how all people on the internet always get pissed for no reason over the most ridiculous shit ever',
    media: {
        // imageUrl: 'http://example.com/image.jpg',
        // videoUrl: 'http://example.com/video.mp4',
        // linkUrl can be included if there's a link in the content
    },
    metadata: {
        location: 'Constanța, Romania', // Optional
    },
    engagement: {
        reposts: 10,
        likes: 100,
        comments: 5,
    },
    createdAt: new Date().getTime(),
    hashtags: ['#example', '#typescript'],
    mentions: ['@anotheruser'],
}
