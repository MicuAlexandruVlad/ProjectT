import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import AuthTokens from "../../data/models/AuthTokens"
import AsyncStorageUtils from "../../utils/AsyncStorageUtils"
  
const initialState: AuthTokens = {
    jwt: '',
}

const TAG = 'Redux:'
export const authTokensSlice = createSlice({
    name: "authTokens",
    initialState,
    reducers: {
        setJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
            AsyncStorageUtils.setApiToken(action.payload)
        },

        resetAuthTokens: (state) => {
            state.jwt = ''
            AsyncStorageUtils.removeApiToken()
        }
    }
})

export const { setJwt, resetAuthTokens } = authTokensSlice.actions

export default authTokensSlice.reducer
