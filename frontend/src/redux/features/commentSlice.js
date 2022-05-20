import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await api.addComment(commentData);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getComments();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: {},
    comments: [],
    error: "",
    loading: false,
  },

  reducers: {
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
  extraReducers: {
    [addComment.pending]: (state, action) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getComments.pending]: (state, action) => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload.data;
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setComment, setComments } = commentSlice.actions;

export default commentSlice.reducer;
