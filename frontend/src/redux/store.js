import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import PostReducer from "./features/postSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
  },
});
