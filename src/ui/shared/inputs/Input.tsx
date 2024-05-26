import React, { memo, useCallback } from "react"
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ImageSourcePropType, KeyboardTypeOptions, StyleProp, TextStyle } from "react-native"
import { useSelector } from "react-redux"
import AppStore from "../../../data/models/AppStore"
import UIController from "../../../data/models/UIController"
import darkTheme from "../../theme/DarkTheme"
import lightTheme from "../../theme/LightTheme"
import Theme from "../../../data/models/Theme"
import { dimensions } from "../../../utils/Constants"

type Props = {
    label: string
    placeholder: string
    value: string
    onChange: (value: string) => void
    iconRight?: ImageSourcePropType
    iconRightColor?: string
    onIconRightPress?: () => void
    capitalizeSentences?: boolean
    capitalizeWords?: boolean
    multiLine?: boolean
    numberOfLines?: number
    secure?: boolean
    noLabel?: boolean
    bodyStyle?: any
    disabled?: boolean
    inputHolderStyle?: any
    keyboardType?: KeyboardTypeOptions
    hasChangeButton?: boolean
    onChangeButtonPress?: () => void
    disableIconRightPress?: boolean
}

const TAG = 'Input:'
const Input: React.FC<Props> = ({
    label, placeholder, value, onChange, multiLine, numberOfLines, secure, bodyStyle, capitalizeSentences, capitalizeWords,
    inputHolderStyle, noLabel, disabled, iconRight, iconRightColor, onIconRightPress, keyboardType, hasChangeButton,
    onChangeButtonPress, disableIconRightPress
}) => {
	const uiController = useSelector<AppStore, UIController>((store) => store.uiController)
	const theme = uiController.isDarkTheme ? darkTheme : lightTheme

    const onRightIconPressed = useCallback(() => {
        onIconRightPress && onIconRightPress()
    }, [])

    const styles = styleSheet(theme)
    return (
        <View style={{ ...bodyStyle }}>
            {
                !noLabel ?
                <Text style={ styles.label }>{ label }</Text>
                :
                <></>
            }
            <View style={{
                ...styles.inputHolder,
                ...inputHolderStyle,
            }}>
                <TextInput
                    placeholder={ placeholder }
                    value={ value }
                    editable={ !disabled }
                    onChangeText={ (value) => onChange(value) }
                    secureTextEntry={ secure }
                    cursorColor={ theme.colors.primary }
                    selectionColor={ `${theme.colors.primary}BB` }
                    style={ styles.input }
                    keyboardType={ keyboardType }
                    placeholderTextColor={ `${theme.colors.onSurface}BB` }
                    autoCapitalize={ capitalizeSentences ? 'sentences' : capitalizeWords ? 'words' : 'none' }
                    multiline={ multiLine }
                    numberOfLines={ numberOfLines ? numberOfLines : multiLine ? undefined : 1 }
                    autoCorrect={ false }
                />
                {
                    iconRight ?
                    <TouchableOpacity
                        activeOpacity={ .6 }
                        onPress={ onRightIconPressed }
                        disabled={ disableIconRightPress }
                        style={ styles.iconRightContainer }
                    >
                        <Image
                            source={ iconRight }
                            style={ styles.iconRight }
                        />
                    </TouchableOpacity>
                    :
                    <></>
                }
                {
                    hasChangeButton ?
                    <TouchableOpacity
                        activeOpacity={ dimensions.TOUCHABLE_ACTIVE_OPACITY }
                        onPress={ onChangeButtonPress }
                        style={ styles.changeButton }
                    >
                        <Text style={ styles.changeButtonText }>Change</Text>
                    </TouchableOpacity>
                    :
                    <></>
                }
            </View>
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    inputHolder: {
        backgroundColor: theme.colors.surfaceContainer,
        borderRadius: dimensions.BORDER_RADIUS,
        flexDirection: 'row',
        alignItems: 'center'
    },

    label: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: `${theme.colors.onBackground}BB`,
        marginHorizontal: 16,
        marginBottom: 6,
        letterSpacing: dimensions.LETTER_SPACING
    },

    input: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.onSurfaceVariant,
        opacity: 1,
        flex: 1,
        letterSpacing: dimensions.LETTER_SPACING,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    iconRightContainer: {
        marginLeft: 'auto',
        paddingLeft: 12
    },

    iconRight: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },

    changeButton: {
        backgroundColor: theme.colors.secondary,
        borderRadius: dimensions.BORDER_RADIUS,
        paddingHorizontal: 12,
        marginLeft: 'auto',
        paddingVertical: 8,
        zIndex: 4
    },

    changeButtonText: {
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        color: theme.colors.onSecondary,
        letterSpacing: dimensions.LETTER_SPACING,
    }
})

export default memo(Input)
