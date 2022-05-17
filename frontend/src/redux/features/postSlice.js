import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ postData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createPost(postData);
      toast.success("Post Added Successful");
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    posts: [],
    userPosts: [],
    error: "",
    loading: false,
  },

  reducers: {},
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [action.payload];
    },
    [createPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default postSlice.reducer;
