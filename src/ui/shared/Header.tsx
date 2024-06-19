import React, { memo } from "react"
import Theme from "../../data/models/Theme"
import { StyleSheet, Text, View } from "react-native"
import { dimensions } from "../../utils/Constants"
import { useSelector } from "react-redux"
import ThemeUtils from "../../utils/ThemeUtils"

type Props = {
    title: string
}

const Header: React.FC<Props> = ({ title }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)
    const styles = styleSheet(theme)
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>{ title }</Text>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
    },

    title: {
        fontSize: 30,
        fontFamily: 'Inter-Light',
        letterSpacing: dimensions.LETTER_SPACING + 1,
        color: theme.colors.onBackground,
        marginBottom: 40
    },
})

export default memo(Header)