import { Post } from "../data/models/Post";
import UserPostsResponse from "../data/models/api/UserPostsResponse";

export default class APIObjectParser {
    static userPostResponseToPost(data: UserPostsResponse) {
        const posts = data.posts.map(post => {
            const fields = post._fields[0]
            
            const p: Post = {
                id: fields.identity.low,
                userId: fields.properties.userId,
                content: fields.properties.content,
                engagement: JSON.parse(fields.properties.engagement),
                metadata: JSON.parse(fields.properties.metadata),
                user: JSON.parse(fields.properties.user),
                hashtags: fields.properties.hashtags,
                media: JSON.parse(fields.properties.media),
                mentions: fields.properties.mentions
            }

            return p
        })

        return posts
    }
}