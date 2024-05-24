import { configureStore } from "@reduxjs/toolkit";
import authTokens from "./slices/authTokens";
import uiController from "./slices/uiController";

export default configureStore({
    reducer: {
        authTokens,
        uiController
    }
})
