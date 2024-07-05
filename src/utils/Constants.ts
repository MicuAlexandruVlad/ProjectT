import { Dimensions } from "react-native"

const constants = {
    APP_VERSION: '0.1',
    THEME_DARK: 'theme-dark',
    THEME_LIGHT: 'theme-light',
    ACTIVE_USER_ID: 'active_user_id',
    ACTIVE_API_TOKEN: 'active_api_token',
    ACTIVE_USER_DATA: 'activeUserData',
    RECENT_SEARCHED_USERS: 'recentSearchedUsers',
    RECENT_SEARCHES: 'recentSearches',
    API_TIMEOUT: 5000,
    AUTH_TOKEN: 'auth_token',
}

export const dimensions = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
    MARGIN: 20,
    BORDER_RADIUS: 40,
    LETTER_SPACING: 0.5,
    TOUCHABLE_ACTIVE_OPACITY: 0.7,
    LINE_HEIGHT: 24
}

export const placeholders = {
    NO_USERS_FOLLOWED_TITLE: 'Get Started by Following Users!',
    NO_USERS_FOLLOWED_SUBTITLE: "Looks like you're new here! Start exploring by following some users to see their latest posts.",
    NO_RECENT_SEARCHED_USERS: 'No Recent Searched Users',
    NO_RECENT_SEARCHES: 'No Recent Searches',
}

export const getViewSwitcherOptions = () => [
    { title: 'Posts', selected: true },
    { title: 'Media', selected: false },
    { title: 'Reposts', selected: false },
    { title: 'Likes', selected: false }
]

export default constants
