import React, { memo, useMemo } from "react"
import { StyleSheet, View, Text, ViewStyle, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import Theme from "../../data/models/Theme"
import AppStore from "../../data/models/AppStore"
import UIController from "../../data/models/UIController"
import darkTheme from "../theme/DarkTheme"
import lightTheme from "../theme/LightTheme"
import { dimensions } from "../../utils/Constants"
type Props = {
    children: any
    bodyStyle?: ViewStyle
    onPress?: () => void
}

const TAG = 'CustomCard:'
const CustomCard: React.FC<Props> = ({ children, bodyStyle, onPress }) => {
    const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
    const theme = uiController.isDarkTheme ? darkTheme : lightTheme
    
    const styles = styleSheet(theme)

    const onCardPress = React.useCallback(() => {
        onPress && onPress()
    }, [onPress])

    const pressOpacity = React.useMemo(() => {
        return onPress ? dimensions.TOUCHABLE_ACTIVE_OPACITY : 1
    }, [onPress])
    
    return (
        <TouchableOpacity
            style={{
                ...styles.body,
                ...bodyStyle,
            }}
            activeOpacity={ pressOpacity }
            onPress={ onCardPress }
        >
            { children }
        </TouchableOpacity>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    body: {
        padding: 16,
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: theme.colors.surfaceContainerHigh,
    },

    title: {
        fontFamily: 'NunitoSans-Bold',
        color: theme.colors.onSecondaryContainer,
        fontSize: 20,
        marginBottom: 12,
        letterSpacing: .3
    }
})

export default memo(CustomCard)
