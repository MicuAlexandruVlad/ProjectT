import React, { memo } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Theme from "../../../../data/models/Theme"
import { useSelector } from "react-redux"
import ThemeUtils from "../../../../utils/ThemeUtils"
import Option from "../../../../data/models/Option"
import { dimensions } from "../../../../utils/Constants"

type Props = {
    options: Array<Option>
    onOptionPress: (index: number) => void
}

const ViewSwitcher: React.FC<Props> = ({ options, onOptionPress }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)
    const styles = styleSheet(theme)

    
    return (
        <View style={ styles.container }>
        {
            options.map((option, index) => (
                <TouchableOpacity style={{
                    ...styles.button,
                    backgroundColor: !option.selected ? theme.colors.surfaceContainerHighest : theme.colors.secondaryFixed
                }} key={ index } onPress={ () => onOptionPress(index) }>
                    <Text style={{
                        ...styles.text,
                        color: !option.selected ? theme.colors.onSurface : theme.colors.onSecondaryFixed
                    }}>{ option.title }</Text>
                </TouchableOpacity>
            ))
        }
        </View>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },

    button: {
        padding: 10,
        borderRadius: 20
    },
    
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        letterSpacing: dimensions.LETTER_SPACING,
        color: theme.colors.onSurface

    }
})

export default memo(ViewSwitcher)
