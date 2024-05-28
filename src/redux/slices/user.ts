import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import User from "../../data/models/User"
import { BaseActionCreator } from "@reduxjs/toolkit/dist/createAction"
import AsyncStorageUtils from "../../utils/AsyncStorageUtils"

interface LocalState {
    user: User | null
}

const initialState: LocalState = {
    user: null
}

const TAG = 'Redux:'
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload

            if (action.payload) {
                AsyncStorageUtils.setActiveUser(action.payload)
            }
        },

        logOutUser: (state) => {
            state.user = null
            AsyncStorageUtils.removeActiveUser()
        }
    }
})

export const { setUser, logOutUser } = userSlice.actions

export default userSlice.reducer
