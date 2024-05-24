import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import AuthTokens from "../../data/models/AuthTokens"
  
const initialState: AuthTokens = {
    jwt: '',
}

const TAG = 'Redux:'
export const authTokensSlice = createSlice({
    name: "authTokens",
    initialState,
    reducers: {
        setJwt: (state, action: PayloadAction<string>) => {
            console.log(TAG, 'setJwt:', action.payload)
            state.jwt = action.payload
        },

        resetAuthTokens: (state) => {
            state.jwt = ''
        }
    }
})

export const { setJwt, resetAuthTokens } = authTokensSlice.actions

export default authTokensSlice.reducer
