import React, { memo } from "react"
import Theme from "../../data/models/Theme"
import { StyleSheet, TouchableOpacity, Image, StyleProp, ViewStyle } from "react-native"
import ThemeUtils from "../../utils/ThemeUtils"
import { useSelector } from "react-redux"

type Props = {
    onPress: () => void
    iconSource: any,
    bodyStyle?: StyleProp<ViewStyle>
}

const HeaderButton: React.FC<Props> = ({ onPress, iconSource, bodyStyle }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)
    
    return (
        <TouchableOpacity
            style={[ styles.container, bodyStyle ]}
            onPress={ onPress }
            activeOpacity={ .6 }
        >
            <Image source={ iconSource } style={ styles.icon } />
        </TouchableOpacity>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderRadius: 40,
        overflow: 'hidden',
        backgroundColor: theme.colors.surfaceContainer,
        position: 'absolute',
        right: 20,
        top: 20,
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        width: '50%',
        height: '50%',
        tintColor: theme.colors.onSurface,
    }
})

export default memo(HeaderButton)
