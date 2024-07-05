import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Post } from "../../data/models/Post"
import { UserPreview } from "../../data/models/User"
import AsyncStorageUtils from "../../utils/AsyncStorageUtils"

export interface SearchState {
    recentUsers: UserPreview[]
    recentSearches: string[]
}

const initialState: SearchState = {
    recentUsers: [],
    recentSearches: []
}

const TAG = 'Redux:'
export const postsSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setRecentSearchedUsers: (state, action: PayloadAction<UserPreview[]>) => {
            state.recentUsers = action.payload
        },

        insertRecentSearchedUser: (state, action: PayloadAction<UserPreview>) => {
            // checking if the user is already in the list
            const canInsertUser = state.recentUsers.find(user => user.id === action.payload.id) === undefined

            if (!canInsertUser) return
            
            const newState = [
                action.payload,
                ...state.recentUsers
            ].slice(0, 5)

            AsyncStorageUtils.setRecentSearchedUsers(newState)
            
            state.recentUsers = newState
        },

        setRecentSearches: (state, action: PayloadAction<string[]>) => {
            state.recentSearches = action.payload
        },

        insertRecentSearch: (state, action: PayloadAction<string>) => {
            // checking if the search is already in the list
            const canInsertSearch = state.recentSearches.find(search => search === action.payload) === undefined

            if (!canInsertSearch) return
            
            const newState = [
                action.payload,
                ...state.recentSearches
            ].slice(0, 10)

            AsyncStorageUtils.setRecentSearches(newState)
            
            state.recentSearches = newState
        }
    }
})

export const {
    setRecentSearchedUsers, insertRecentSearch, insertRecentSearchedUser, setRecentSearches
} = postsSlice.actions

export default postsSlice.reducer
