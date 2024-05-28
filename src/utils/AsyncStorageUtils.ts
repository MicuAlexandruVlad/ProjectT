import AsyncStorage from "@react-native-async-storage/async-storage"
import constants from "./Constants"

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
}
