import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Post } from "../../data/models/Post"

interface LocalState {
    posts: Post[] | []
}

const initialState: LocalState = {
    posts: []
}

const TAG = 'Redux:'
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
        },
    }
})

export const { setPosts } = postsSlice.actions

export default postsSlice.reducer
