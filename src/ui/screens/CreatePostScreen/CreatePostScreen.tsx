import { NavigationProp } from "@react-navigation/native"
import React from "react"
import RootStackParamList from "../../../navigation/RootStackParamList"
import Theme from "../../../data/models/Theme"
import { StyleSheet, Text, View } from "react-native"
import Header from "../../shared/Header"
import { useDispatch, useSelector } from "react-redux"
import ThemeUtils from "../../../utils/ThemeUtils"
import { dimensions } from "../../../utils/Constants"
import Button from "../../shared/Button"
import Input from "../../shared/inputs/Input"
import AppStore from "../../../data/models/AppStore"
import User from "../../../data/models/User"
import { Post, UnuploadedPost } from "../../../data/models/Post"
import Api from "../../../network/Api"
import { setLoading } from "../../../redux/slices/uiController"

type Props = {
    navigation: NavigationProp<RootStackParamList>
}

const TAG = 'CreatePostScreen:'
const CreatePostScreen: React.FC<Props> = ({ navigation }): React.JSX.Element => {
    const theme = ThemeUtils.getTheme(useSelector)
    const styles = stylesSheet(theme)

    const dispatch = useDispatch()

    const user = useSelector<AppStore, User>((store) => store.user.user)    
    const jwt = useSelector<AppStore, string>((store) => store.authTokens.jwt)

    const [postText, setPostText] = React.useState('')

    const onCreatePost = React.useCallback(() => {
        if (postText.trim() === '') {
            alert('Post cannot be empty')
            
            return
        }

        dispatch(setLoading(true))

        const post: UnuploadedPost = {
            content: postText,
            metadata: {
                timestamp: new Date().getTime(),
            },
            user: {
                userId: user.id,
            },
            hashtags: [],
            mentions: [],
            media: {}
        }

        Api.createPost(post, jwt).then((post: Post) => {
            dispatch(setLoading(false))
            navigation.goBack()
        }).catch((error: any) => {
            dispatch(setLoading(false))
            console.log(TAG, 'Error creating post:', error)
        })
    }, [postText, user])
    
    return (
        <View style={ styles.container }>
            <Header
                title="Create Post"
            />
            <Input
                label="Post"
                placeholder="What's on your mind?"
                value={ postText }
                onChange={ setPostText }
                multiLine
                numberOfLines={ 5 }
                noLabel
                inputHolderStyle={{ borderRadius: 16 }}
                bodyStyle={{ maxHeight: dimensions.HEIGHT / 2.4 }}
            />
            <View style={{ marginTop: 'auto' }}>
                <Button
                    text="Create Post"
                    onPress={ onCreatePost }
                />
            </View>
        </View>
    )
}

const stylesSheet = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: dimensions.MARGIN
    }
})

export default CreatePostScreen
