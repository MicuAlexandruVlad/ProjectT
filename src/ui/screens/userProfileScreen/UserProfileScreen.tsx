import React from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { NavigationProp } from "@react-navigation/native"
import { ScrollView, StyleSheet } from "react-native"
import Theme from "../../../data/models/Theme"
import ThemeUtils from "../../../utils/ThemeUtils"
import { useSelector } from "react-redux"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const UserProfileScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)
    const styles = styleSheet(theme)
    
    return (
        <ScrollView contentContainerStyle={ styles.container }>

        </ScrollView>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    }
})

export default UserProfileScreen
