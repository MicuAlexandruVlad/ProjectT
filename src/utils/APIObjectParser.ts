import { Post, PostUser } from "../data/models/Post";
import UserPostsResponse, { PostField } from "../data/models/api/UserPostsResponse";

export default class APIObjectParser {
    static userPostResponseToPost(data: UserPostsResponse) {
        const posts = data.posts.map(post => {
            const postIndex = post._fieldLookup['post']
            const userIndex = post._fieldLookup['user']
            
            const postFields = post._fields[postIndex] as PostField
            const userFields = post._fields[userIndex] as PostUser
            
            const p: Post = {
                id: postFields.identity.low,
                userId: postFields.properties.userId,
                content: postFields.properties.content,
                engagement: JSON.parse(postFields.properties.engagement),
                metadata: JSON.parse(postFields.properties.metadata),
                user: userFields,
                hashtags: postFields.properties.hashtags,
                media: JSON.parse(postFields.properties.media),
                mentions: postFields.properties.mentions,
                createdAt: postFields.properties.createdAt,
            }

            return p
        })

        return posts
    }
}