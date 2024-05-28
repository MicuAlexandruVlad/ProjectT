import AsyncStorage from "@react-native-async-storage/async-storage"
import constants from "./Constants"
import User from "../data/models/User"

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
}
