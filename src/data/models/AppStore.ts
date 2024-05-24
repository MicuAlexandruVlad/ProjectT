import AuthTokens from "./AuthTokens"
import UIController from "./UIController"
import User from "./User"

export default interface AppStore {
    user: {
        user: User
    }
    uiController: UIController
    authTokens: AuthTokens
}
