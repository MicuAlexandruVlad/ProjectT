import AuthTokens from "./AuthTokens"
import { Post } from "./Post"
import UIController from "./UIController"
import User from "./User"

export default interface AppStore {
    user: {
        user: User
    }
    uiController: UIController
    authTokens: AuthTokens
    posts: {
        posts: Post[]
    }
}
