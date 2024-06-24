import { configureStore } from "@reduxjs/toolkit";
import authTokens from "./slices/authTokens";
import uiController from "./slices/uiController";
import user from "./slices/user";
import posts from "./slices/posts";

export default configureStore({
    reducer: {
        authTokens,
        uiController,
        user,
        posts
    }
})
