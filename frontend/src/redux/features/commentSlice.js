import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await api.createComment(commentData);
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

// export const getComment = createAsyncThunk(
//   "comment/getComment",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await api.getComment(id);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

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
    [createComment.pending]: (state, action) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [createComment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getComments.pending]: (state, action) => {
      state.loading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default commentSlice.reducer;
