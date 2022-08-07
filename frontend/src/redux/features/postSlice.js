import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addPost = createAsyncThunk(
  "post/addPost",
  async ({ postData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.addPost(postData);
      toast.success("Post Added Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPosts();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getPost(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchPost = createAsyncThunk(
  "post/searchPost",
  async ({ searchValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.getPostBySearch(searchValue);
      if (!response.data.length) {
        toast.error(`no post found with: '${searchValue}'`);
        navigate("/");
      }
      if (response.data.length) {
        navigate(`/post/search/${searchValue}`);
        toast.success(
          `found ${response.data.length} post with '${searchValue}'`
        );
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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

  reducers: {
    // setPost: (state, { payload }) => {
    //   state.post = payload;
    // },
    // setPosts: (state, { payload }) => {
    //   state.posts = payload;
    // },
  },
  extraReducers: {
    [addPost.pending]: (state) => {
      state.loading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, action.payload];
    },
    [addPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPosts.pending]: (state) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getPost.pending]: (state) => {
      state.loading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [searchPost.pending]: (state) => {
      state.loading = true;
    },
    [searchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [searchPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export const { setPost, setPosts } = postSlice.actions;

export default postSlice.reducer;
