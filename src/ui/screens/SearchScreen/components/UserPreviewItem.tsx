import React, { memo, useMemo } from "react"
import { UserPreview } from "../../../../data/models/User"
import Theme from "../../../../data/models/Theme"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import ThemeUtils from "../../../../utils/ThemeUtils"
import { useSelector } from "react-redux"

type Props = {
    user: UserPreview
    onPress: (userId: number) => void
}

const UserPreviewItem: React.FC<Props> = ({ user, onPress }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)

    const styles = styleSheet(theme)

    const displayName = useMemo(() => {
        return user.firstName + ' ' + user.lastName
    }, [user.firstName, user.lastName])

    const imagePlaceholder = useMemo(() => {
        return displayName.charAt(0).toUpperCase()
    }, [displayName])
    
    return (
        <TouchableOpacity onPress={ () => onPress(user.id) } style={ styles.container } activeOpacity={ .7 }>
            <View
                style={ styles.imageHolder }
            >
                <Text style={ styles.defaultImageFont }>{ imagePlaceholder }</Text>
            </View>
            <View style={{ marginLeft: 12 }}>
                <Text ellipsizeMode="tail" numberOfLines={ 1 } style={ styles.userDisplayName }>{ displayName }</Text>
                <Text ellipsizeMode="tail" numberOfLines={ 1 } style={ styles.username }>{ `@${ user.username }` }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },

    imageHolder: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: theme.colors.secondaryFixed,
        justifyContent: 'center',
        alignItems: 'center'
    },

    defaultImageFont: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: theme.colors.onSecondaryFixedVariant
    },

    userDisplayName: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: theme.colors.onBackground
    },

    username: {
        fontFamily: 'Inter-Light',
        fontSize: 14,
        color: theme.colors.onBackground
    },
})

export default memo(UserPreviewItem)