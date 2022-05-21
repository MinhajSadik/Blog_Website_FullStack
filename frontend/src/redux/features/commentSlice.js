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

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getComment(id);
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

  reducers: {},
  extraReducers: {
    [addComment.pending]: (state, action) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comment = action.payload;
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getComment.pending]: (state, action) => {
      state.loading = true;
    },
    [getComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setComment, setComments } = commentSlice.actions;

export default commentSlice.reducer;
