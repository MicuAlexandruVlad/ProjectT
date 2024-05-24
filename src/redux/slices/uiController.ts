import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import UIController from "../../data/models/UIController"

const initialState: UIController = {
    isDarkTheme: false,
    loading: false
}

export const uiControllerSlice = createSlice({
    name: "uiController",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

        setTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkTheme = action.payload
        },

        resetUIController: (state) => {
            state.isDarkTheme = false
            state.loading = false
        },

    }
})

export const {
    setLoading,
    setTheme,
    resetUIController,
} = uiControllerSlice.actions

export default uiControllerSlice.reducer
