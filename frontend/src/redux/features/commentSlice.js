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
    [addComment.pending]: (state) => {
      state.loading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = [...state.comments, action.payload];
    },
    [addComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getComments.pending]: (state) => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setComment, setComments } = commentSlice.actions;

export default commentSlice.reducer;
