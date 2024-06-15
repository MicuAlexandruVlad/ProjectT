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
    user: PostUser
    content: string
    media?: Media
    metadata: {
        postId: string
        timestamp: Date
        location?: string
    }
    engagement: Engagement
    hashtags?: string[]
    mentions?: string[]
}

const examplePost: Post = {
    user: {
        username: 'user123',
        displayName: 'User OneTwoThree',
        userId: '00123',
        profilePictureUrl: 'http://example.com/profile.jpg',
    },
    content: 'This is an example tweet!',
    media: {
        imageUrl: 'http://example.com/image.jpg',
        videoUrl: 'http://example.com/video.mp4',
        // linkUrl can be included if there's a link in the content
    },
    metadata: {
        postId: 'post00123',
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
