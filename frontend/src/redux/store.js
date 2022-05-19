import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import CommentReducer from "./features/commentSlice";
import PostReducer from "./features/postSlice";
import ReplyReducer from "./features/replySlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    comment: CommentReducer,
    reply: ReplyReducer,
  },
});
