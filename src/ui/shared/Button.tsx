import React, { memo } from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import AppStore from "../../data/models/AppStore"
import UIController from "../../data/models/UIController"
import darkTheme from "../theme/DarkTheme"
import lightTheme from "../theme/LightTheme"
import Theme from "../../data/models/Theme"
import { dimensions } from "../../utils/Constants"

type Props = {
    text: string
    onPress: Function
    bodyStyle?: any
    textStyle?: any
    disabled?: boolean
}

const TAG = 'Button:'
const Button: React.FC<Props> = ({ text, onPress, bodyStyle, textStyle, disabled }) => {
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
	const theme = uiController.isDarkTheme ? darkTheme : lightTheme

    const styles = styleSheet(theme)
    return (
        <TouchableOpacity
            onPress={ () => onPress() }
            activeOpacity={ dimensions.TOUCHABLE_ACTIVE_OPACITY }
            disabled={ disabled }
            style={{
                ...styles.body,
                ...bodyStyle
            }}
        >
            <Text style={{
                ...styles.font,
                ...textStyle
            }}>{ text }</Text>
        </TouchableOpacity>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    body: {
        backgroundColor: theme.colors.primary,
        borderRadius: 40,
        paddingVertical: 12,
    },

    font: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: theme.colors.onPrimary,
        alignSelf: 'center',
        letterSpacing: .3
    }
})

export default memo(Button)
