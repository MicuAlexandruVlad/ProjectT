import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../../../data/models/Theme'
import { useDispatch, useSelector } from 'react-redux'
import { dimensions } from '../../../utils/Constants'
import AnimatedLottieView from "lottie-react-native"
import { NavigationProp } from '@react-navigation/native'
import RootStackParamList from '../../../navigation/RootStackParamList'
import ThemeUtils from '../../../utils/ThemeUtils'
import Routes from '../../../navigation/Routes'
import AsyncStorageUtils from '../../../utils/AsyncStorageUtils'
import { setJwt } from '../../../redux/slices/authTokens'
import { setUser } from '../../../redux/slices/user'
import { setRecentSearchedUsers, setRecentSearches } from '../../../redux/slices/search'

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const TAG = 'SplashScreen:'
const SplashScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const dispatch = useDispatch()
    
    const loadingAnim = require('../../../../assets/animations/loading.json')
    
    const styles = styleSheet(theme)

    useEffect(() => {
        startupLogic()
    }, [])
    
    const startupLogic = async () => {
        const user = await AsyncStorageUtils.getActiveUser()
        const token = await AsyncStorageUtils.getApiToken()
        const recentSearchedUsers = await AsyncStorageUtils.getRecentSearchedUsers()
        const recentSearches = await AsyncStorageUtils.getRecentSearches()

        if (user && token) {
            dispatch(setUser(user))
            dispatch(setJwt(token))

            recentSearchedUsers && dispatch(setRecentSearchedUsers(recentSearchedUsers))
            recentSearches && dispatch(setRecentSearches(recentSearches))
        
            navigation.reset({
                index: 0,
                routes: [{ name: Routes.MAIN_SCREEN }]
            })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: Routes.LOGIN_SCREEN }]
            })
        }
    }
    
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={ styles.titleHolder }>
                <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                    {/* <Image
                        source={ logo }
                        style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                            marginBottom: -2
                        }}
                    /> */}
                    <Text style={ styles.text }>Project T</Text>
                </View>
                <AnimatedLottieView
                    source={ loadingAnim }
                    style={ styles.animation }
                    loop={ true }
                    autoPlay={ true }/>
            </View>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    titleHolder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: theme.colors.onBackground,
        fontSize: 24,
        // fontWeight: 'bold',
        marginLeft: 8,
        fontFamily: 'Inter-Bold',
        letterSpacing: dimensions.LETTER_SPACING + 1
    },
    animation: {
        width: dimensions.WIDTH / 3.5,
        height: dimensions.WIDTH / 3.5,
    },
})

export default SplashScreen
