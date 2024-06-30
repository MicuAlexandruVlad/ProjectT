import { NavigationProp } from "@react-navigation/native"
import React, { useCallback } from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { View, Text, StyleSheet } from "react-native"
import Theme from "../../../data/models/Theme"
import { useDispatch, useSelector } from "react-redux"
import ThemeUtils from "../../../utils/ThemeUtils"
import Button from "../../shared/Button"
import AsyncStorageUtils from "../../../utils/AsyncStorageUtils"
import { dimensions } from "../../../utils/Constants"
import { setUserProfilePosts, setUserProfilePostsRetrieved } from "../../../redux/slices/posts"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const SettingsScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const dispatch = useDispatch()

    const onLogout = useCallback(() => {
        AsyncStorageUtils.removeActiveUser()
        AsyncStorageUtils.removeApiToken()

        dispatch(setUserProfilePosts([]))
        dispatch(setUserProfilePostsRetrieved(false))
        
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }]
        })
    }, [])

    return (
        <View style={ styles.container }>
            <Text>Settings Screen</Text>
            <View style={{ marginTop: 'auto' }}>
                <Button
                    text='Logout'
                    onPress={ onLogout }
                />
            </View>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        margin: dimensions.MARGIN,
    }
})

export default SettingsScreen
