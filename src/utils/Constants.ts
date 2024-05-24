import { Dimensions } from "react-native"

const constants = {
    APP_VERSION: '0.1',
    THEME_DARK: 'theme-dark',
    THEME_LIGHT: 'theme-light',
    ACTIVE_USER_ID: 'active_user_id',
    ACTIVE_USER_DATA: 'activeUserData',
    API_TIMEOUT: 5000,
    AUTH_TOKEN: 'auth_token',
}

export const dimensions = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    MARGIN: 20,
    BORDER_RADIUS: 16,
    LETTER_SPACING: 0.3,
    TOUCHABLE_ACTIVE_OPACITY: 0.7,
}

export default constants
