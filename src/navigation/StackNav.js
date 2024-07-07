import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import Routes from './Routes'
import darkTheme from '../ui/theme/DarkTheme'
import lightTheme from '../ui/theme/LightTheme'
import SplashScreen from '../ui/screens/SplashScreen/SplashScreen'
import LoginScreen from '../ui/screens/LoginScreen/LoginScreen'
import RegisterScreen from '../ui/screens/RegisterScreen/RegisterScreen'
import MainScreen from '../ui/screens/MainScreen/MainScreen'
import SettingsScreen from '../ui/screens/SettingsScreen/SettingsScreen'
import EditProfileScreen from '../ui/screens/EditProfileScreen/EditProfileScreen'
import CreatePostScreen from '../ui/screens/CreatePostScreen/CreatePostScreen'
import UserProfileScreen from '../ui/screens/userProfileScreen/UserProfileScreen'


const Stack = createStackNavigator()

const StackNav = () => {
    const uiController = useSelector(store => store.uiController)

    const theme = uiController.darkTheme ? darkTheme : lightTheme

    return (
        <Stack.Navigator
            initialRouteName={ Routes.SPLASH_SCREEN }
        >
            <Stack.Screen
                name={ Routes.SPLASH_SCREEN }
                component={ SplashScreen }
                options={{
                    title: 'Splash',
                    headerShown: false
                }}
                />
           <Stack.Screen
                name={ Routes.LOGIN_SCREEN }
                component={ LoginScreen }
                options={{
                    title: 'Login',
                    headerShown: false
                }}
                /> 
            <Stack.Screen
                name={ Routes.REGISTER_SCREEN }
                component={ RegisterScreen }
                options={{
                    title: 'Register',
                    headerShown: false
                }}
                />
            <Stack.Screen
                name={ Routes.MAIN_SCREEN }
                component={ MainScreen }
                options={{
                    title: 'Main',
                    headerShown: false
                }}
                />
            <Stack.Screen
                name={ Routes.SETTINGS_SCREEN }
                component={ SettingsScreen }
                options={{
                    title: 'Settings',
                    headerShown: false
                }}
                />
            <Stack.Screen
                name={ Routes.EDIT_SCREEN }
                component={ EditProfileScreen }
                options={{
                    title: 'Edit Profile',
                    headerShown: false
                }}
                />
            <Stack.Screen
                name={ Routes.CREATE_POST_SCREEN }
                component={ CreatePostScreen }
                options={{
                    title: 'Create Post',
                    headerShown: false
                }}
                />
            <Stack.Screen
                name={ Routes.USER_PROFILE_SCREEN }
                component={ UserProfileScreen }
                options={{
                    title: 'User Profile',
                    headerShown: false
                }}
                />
        </Stack.Navigator>
    )
}

export default StackNav
