import { NavigationProp } from "@react-navigation/native"
import React from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import Theme from "../../../data/models/Theme"
import ThemeUtils from "../../../utils/ThemeUtils"
import { useSelector } from "react-redux"
import FloatingButton from "../../shared/FloatingButton"
import Routes from "../../../navigation/Routes"
import { dimensions, placeholders } from "../../../utils/Constants"
import PostItem from "../../shared/PostItem"
import { examplePost } from "../../../data/models/Post"

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
        <ScrollView contentContainerStyle={{ padding: dimensions.MARGIN, flexGrow: 1 }}>
            <Text style={ styles.noPostsTitle }>{ placeholders.NO_USERS_FOLLOWED_TITLE }</Text>
            <Text style={ styles.noPostsSubtitle }>{ placeholders.NO_USERS_FOLLOWED_SUBTITLE }</Text>
            <FloatingButton
                onPress={ onNewPost }
            />
            <View style={{ flex: 1 }}>
            </View>
        </ScrollView>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    noPostsTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: theme.colors.secondaryContainer,
        lineHeight: dimensions.LINE_HEIGHT,
        letterSpacing: dimensions.LETTER_SPACING,
    },

    noPostsSubtitle: {
        fontFamily: 'Inter-Light',
        fontSize: 14,
        color: theme.colors.onSurfaceVariant,
        lineHeight: dimensions.LINE_HEIGHT,
        letterSpacing: dimensions.LETTER_SPACING,
        marginTop: 4
    }
})

export default HomeScreen
