import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const createReply = createAsyncThunk(
  "reply/createReply",
  async (replyData, { rejectWithValue }) => {
    try {
      const response = await api.createReply(replyData);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReplies = createAsyncThunk(
  "reply/getReplies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getReplies();
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getReplie = createAsyncThunk(
//   "reply/getReplie",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await api.getReplie(id);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const replySlice = createSlice({
  name: "reply",
  initialState: {
    reply: {},
    replies: [],
    error: "",
    loading: false,
  },

  reducers: {},
  extraReducers: {
    [createReply.pending]: (state, action) => {
      state.loading = true;
    },
    [createReply.fulfilled]: (state, action) => {
      state.loading = false;
      state.replies = [action.payload];
    },
    [createReply.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getReplies.pending]: (state, action) => {
      state.loading = true;
    },
    [getReplies.fulfilled]: (state, action) => {
      state.loading = false;
      state.replies = [action.payload];
    },
    [getReplies.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default replySlice.reducer;
