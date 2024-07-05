import AsyncStorage from "@react-native-async-storage/async-storage"
import constants from "./Constants"
import User, { UserPreview } from "../data/models/User"

export default class AsyncStorageUtils {
    static setApiToken = (token: string) => {
        AsyncStorage.setItem(constants.ACTIVE_API_TOKEN, token)
    }

    static getApiToken = async () => {
        return await AsyncStorage.getItem(constants.ACTIVE_API_TOKEN)
    }

    static removeApiToken = () => {
        AsyncStorage.removeItem(constants.ACTIVE_API_TOKEN)
    }

    static setActiveUser = (user: User) => {
        AsyncStorage.setItem(constants.ACTIVE_USER_DATA, JSON.stringify(user))
    }

    static getActiveUser = async () => {
        const data = await AsyncStorage.getItem(constants.ACTIVE_USER_DATA)
        const user: User | null = data ? JSON.parse(data) : null

        return user
    }

    static removeActiveUser = () => {
        AsyncStorage.removeItem(constants.ACTIVE_USER_DATA)
    }

    static setRecentSearchedUsers = (users: UserPreview[]) => {
        AsyncStorage.setItem(constants.RECENT_SEARCHED_USERS, JSON.stringify(users))
    }

    static getRecentSearchedUsers = async () => {
        const data = await AsyncStorage.getItem(constants.RECENT_SEARCHED_USERS)
        const users: UserPreview[] | null = data ? JSON.parse(data) : null

        return users
    }

    static removeRecentSearchedUsers = () => {
        AsyncStorage.removeItem(constants.RECENT_SEARCHED_USERS)
    }

    static setRecentSearches = (searches: string[]) => {
        AsyncStorage.setItem(constants.RECENT_SEARCHES, JSON.stringify(searches))
    }

    static getRecentSearches = async () => {
        const data = await AsyncStorage.getItem(constants.RECENT_SEARCHES)
        const searches: string[] | null = data ? JSON.parse(data) : null

        return searches
    }

    static removeRecentSearches = () => {
        AsyncStorage.removeItem(constants.RECENT_SEARCHES)
    }
}
