import { NavigationProp } from "@react-navigation/native"
import React from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { View, Text, StyleSheet } from "react-native"
import Theme from "../../../data/models/Theme"
import ThemeUtils from "../../../utils/ThemeUtils"
import { useSelector } from "react-redux"
import FloatingButton from "../../shared/FloatingButton"
import Routes from "../../../navigation/Routes"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const HomeScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const onNewPost = React.useCallback(() => {
        navigation.navigate(Routes.CREATE_POST_SCREEN)
    }, [])

    return (
        <View style={ styles.container }>
            <Text style={{ color: theme.colors.onBackground }}>Home Screen</Text>
            <FloatingButton
                onPress={ onNewPost }
            />
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1
    }
})

export default HomeScreen
