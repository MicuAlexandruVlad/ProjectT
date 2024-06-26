import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Post } from "../../data/models/Post"

export interface PostsState {
    userProfilePosts: Post[] | []
    userProfilePostsRetrieved: boolean
    userMediaPostsRetrieved: boolean
    userRepostsRetrieved: boolean
    userLikesRetrieved: boolean
}

const initialState: PostsState = {
    userProfilePosts: [],
    userProfilePostsRetrieved: false,
    userMediaPostsRetrieved: false,
    userRepostsRetrieved: false,
    userLikesRetrieved: false
}

const TAG = 'Redux:'
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setUserProfilePosts: (state, action: PayloadAction<Post[]>) => {
            state.userProfilePosts = action.payload
        },

        setUserProfilePostsRetrieved: (state, action: PayloadAction<boolean>) => {
            state.userProfilePostsRetrieved = action.payload
        }
    }
})

export const { setUserProfilePosts, setUserProfilePostsRetrieved } = postsSlice.actions

export default postsSlice.reducer
