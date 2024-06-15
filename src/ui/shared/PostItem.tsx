import React, { memo, useCallback, useMemo } from "react"
import Theme from "../../data/models/Theme"
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native"
import Post from "../../data/models/Post"
import { useSelector } from "react-redux"
import ThemeUtils from "../../utils/ThemeUtils"
import user from "../../redux/slices/user"

type Props = {
    post: Post
    onPress: (id: number) => void
    onLike: (id: number) => void
    onRepost: (id: number) => void
    onUserPress: (userId: string) => void
    disableButtons?: boolean
}

const PostItem: React.FC<Props> = ({ post, onPress, onLike, onRepost, onUserPress, disableButtons }): React.JSX.Element => {
    const heartIcon = require('../../../assets/images/heart.png')
    const heartFilledIcon = require('../../../assets/images/heart_filled.png')
    const repostIcon = require('../../../assets/images/repost.png')
    const commentIcon = require('../../../assets/images/comment.png')

    const theme = ThemeUtils.getTheme(useSelector)
    const styles = styleSheet(theme)

    const imagePlaceholder = useMemo(() => {
        return post.user.displayName.charAt(0).toUpperCase()
    }, [post.user.displayName])

    const separator = useMemo(() => {
        return (
            <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: theme.colors.secondary, marginHorizontal: 12 }} />
        )
    }, [])

    const onUserPressed = useCallback(() => {
        onUserPress(post.user.userId)
    }, [post.user.userId])

    const onPostPressed = useCallback(() => {
        onPress(post.id)
    }, [post.id])

    const onLikePressed = useCallback(() => {
        onLike(post.id)
    }, [post.id])

    const onRepostPressed = useCallback(() => {
        onRepost(post.id)
    }, [post.id])
    
    return (
        <TouchableOpacity
            onPress={ onPostPressed }
            activeOpacity={ .7 }
        >
            <View style={ styles.postHeader }>
                <TouchableOpacity
                    disabled={ disableButtons }
                    onPress={ onUserPressed }
                    activeOpacity={ .7 }
                    style={ styles.imageHolder }
                >
                    <Text style={ styles.defaultImageFont }>{ imagePlaceholder }</Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 12 }}>
                    <Text ellipsizeMode="tail" numberOfLines={ 1 } style={ styles.userDisplayName }>{ post.user.displayName }</Text>
                    <Text ellipsizeMode="tail" numberOfLines={ 1 } style={ styles.username }>{ `@${ post.user.username }` }</Text>
                </View>
                { separator }
                <Text style={ styles.timestamp }>16h</Text>
            </View>
            <Text style={ styles.content }>{ post.content }</Text>
            <View style={ styles.engagementHolder }>
                <TouchableOpacity
                    onPress={ onLikePressed }
                    activeOpacity={ .7 }
                    style={ styles.button }
                >
                    <Image
                        source={ heartIcon }
                        style={ styles.icon }
                    />
                    <Text style={ styles.timestamp }>{ post.engagement.likes }</Text>
                </TouchableOpacity>
                { separator }
                <TouchableOpacity
                    onPress={ onRepostPressed }
                    activeOpacity={ .7 }
                    style={ styles.button }
                >
                    <Image
                        source={ repostIcon }
                        style={{
                            ...styles.icon,
                            tintColor: theme.colors.secondary
                        }}
                    />
                    <Text style={ styles.timestamp }>{ post.engagement.reposts }</Text>
                </TouchableOpacity>
                { separator }
                <View style={ styles.button }>
                    <Image
                        source={ commentIcon }
                        style={{
                            ...styles.icon,
                            tintColor: theme.colors.secondary
                        }}
                    />
                    <Text style={ styles.timestamp }>{ post.engagement.comments }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
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

    timestamp: {
        fontFamily: 'Inter-Light',
        fontSize: 14,
        color: theme.colors.onBackground
    },

    content: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.onBackground,
        marginLeft: 62,
        flexWrap: 'wrap'
    },

    engagementHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        marginLeft: 62
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: theme.colors.secondaryContainer,
        marginRight: 8,
        resizeMode: 'contain'
    }
})

export default memo(PostItem)
