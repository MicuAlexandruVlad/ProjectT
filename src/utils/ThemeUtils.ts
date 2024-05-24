import AppStore from "../data/models/AppStore"
import UIController from "../data/models/UIController"
import lightTheme from "../ui/theme/LightTheme"
import darkTheme from "../ui/theme/DarkTheme"
import { AppState, Platform } from "react-native"
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { UseSelector } from "react-redux"
import store from "../redux/store"

class ThemeUtils {
    static getTheme = (selector: UseSelector) => {
        const uiController = selector<AppStore, UIController>((store) => store.uiController)
        const theme = uiController.isDarkTheme ? darkTheme : lightTheme

        return theme
    }

    static isDarkTheme = (selector: UseSelector) => {
        const uiController = selector<AppStore, UIController>((store) => store.uiController)
        const isDarkTheme = uiController.isDarkTheme

        return isDarkTheme
    }

    static getThemeFromStore = () => {
        const uiController = store.getState().uiController
        const theme = uiController.isDarkTheme ? darkTheme : lightTheme

        return theme
    }

    static isDarkThemeFromStore = () => {
        const uiController = store.getState().uiController
        const isDarkTheme = uiController.isDarkTheme

        return isDarkTheme
    }

    static changeNavbarColor = (color: any, isDarkTheme: boolean, animated: boolean = true) => {
        if (Platform.OS === 'android') {
            console.log('changing color')

            SystemNavigationBar.setNavigationColor(color, isDarkTheme ? 'dark' : 'light', 'navigation')
        }
    }
}

export default ThemeUtils
