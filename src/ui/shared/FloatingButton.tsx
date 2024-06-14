import React, { memo } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Theme from "../../data/models/Theme"
import { MaterialIcons } from "@expo/vector-icons"
import ThemeUtils from "../../utils/ThemeUtils"
import { useSelector } from "react-redux"

type Props = {
    onPress: () => void
}

const FloatingButton: React.FC<Props> = ({ onPress }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const handlePress = React.useCallback(() => {
        onPress()
    }, [])
    
    return (
        <TouchableOpacity onPress={ handlePress } style={ styles.container }>
            <MaterialIcons name="post-add" size={ 20 } color={ theme.colors.onTertiaryContainer } />
        </TouchableOpacity>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 24,
        right: 24,
        backgroundColor: theme.colors.tertiaryContainer,
        padding: 16,
        borderRadius: 100
    }
})

export default memo(FloatingButton)
