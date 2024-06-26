import React, { memo, useCallback, useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import ThemeUtils from "../../../../utils/ThemeUtils"
import Theme from "../../../../data/models/Theme"
import { Post } from "../../../../data/models/Post"
import AppStore from "../../../../data/models/AppStore"
import Api from "../../../../network/Api"
import User from "../../../../data/models/User"
import { PostsState, setUserProfilePosts, setUserProfilePostsRetrieved } from "../../../../redux/slices/posts"
import PostItem from "../../../shared/PostItem"
import LottieView from "lottie-react-native"
import { dimensions } from "../../../../utils/Constants"

type Props = {
}

const TAG = 'PostsFragment:'
const PostsFragment: React.FC<Props> = (): React.JSX.Element => {
    const loadingAnim = require('../../../../../assets/animations/loading.json')
    
    const theme = ThemeUtils.getTheme(useSelector)
    const styles = styleSheet(theme)

    const [loading, setLoading] = useState(false)

    const postsState = useSelector<AppStore, PostsState>((state: AppStore) => state.posts)
    const jwt = useSelector<AppStore, string>((state: AppStore) => state.authTokens.jwt)
    const user = useSelector<AppStore, User>((state: AppStore) => state.user.user)

    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)

        if (postsState.userProfilePostsRetrieved) {
            setLoading(false)
            return
        }

        Api.getUserPosts(user.id, jwt).then((posts) => {
            dispatch(setUserProfilePostsRetrieved(true))
            dispatch(setUserProfilePosts(posts))
            setLoading(false)
        }).catch(err => {
            setLoading(false)
        })
    }, [postsState.userProfilePostsRetrieved])

    const onLike = useCallback((post: Post) => {}, [])

    const onPress = useCallback((post: Post) => {}, [])

    const onRepost = useCallback((post: Post) => {}, [])

    const onUserPress = useCallback((post: Post) => {}, [])
    
    
    return (
        <>
        {
            loading ?
            <View style={{
                flex: 1,
                alignItems: 'center',
            }}>
                <LottieView
                    source={ loadingAnim }
                    style={ styles.animation }
                    loop={ true }
                    autoPlay={ true }/>
            </View>
            :
            postsState.userProfilePosts.map((post, index) => (
                <View key={ index } style={{ marginTop: index > 0 ? 16 : 0 }}>
                    <PostItem
                        post={ post }
                        onPress={ () => onPress(post) }
                        onLike={ () => onLike(post) }
                        onRepost={ () => onRepost(post) }
                        onUserPress={ () => onUserPress(post) }
                        disableButtons
                    />
                </View>
            ))
        }
        </>
    )
}

const styleSheet = (theme: Theme) => StyleSheet.create({
    animation: {
        width: dimensions.WIDTH / 5,
        height: dimensions.WIDTH / 5,
    },
})

export default memo(PostsFragment)

