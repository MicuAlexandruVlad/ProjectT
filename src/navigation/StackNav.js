import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import Routes from './Routes'
import darkTheme from '../ui/theme/DarkTheme'
import lightTheme from '../ui/theme/LightTheme'
import SplashScreen from '../ui/screens/SplashScreen/SplashScreen'
import LoginScreen from '../ui/screens/LoginScreen/LoginScreen'
import RegisterScreen from '../ui/screens/RegisterScreen/RegisterScreen'


const Stack = createStackNavigator()

const StackNav = () => {
    const uiController = useSelector(store => store.uiController)

    const theme = uiController.darkTheme ? darkTheme : lightTheme

    return (
        <Stack.Navigator
            initialRouteName={ Routes.SPLASH_SCREEN }
            screenOptions={{
                cardStyle: { backgroundColor: theme.colors.background }
            }}
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
        </Stack.Navigator>
    )
}

export default StackNav
