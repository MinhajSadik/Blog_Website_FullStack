import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const addReply = createAsyncThunk(
  "reply/addReply",
  async (replyData, { rejectWithValue }) => {
    try {
      const response = await api.addReply(replyData);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReply = createAsyncThunk(
  "reply/getReply",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getReply(id);
      return response.data;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const replySlice = createSlice({
  name: "reply",
  initialState: {
    reply: {},
    replies: [],
    error: "",
    loading: false,
  },

  reducers: {
    setReply: (state, action) => {
      state.reply = action.payload;
    },
    setReplies: (state, action) => {
      state.replies = action.payload;
    },
  },
  extraReducers: {
    [addReply.pending]: (state, action) => {
      state.loading = true;
    },
    [addReply.fulfilled]: (state, action) => {
      state.loading = false;
      state.reply = action.payload;
    },
    [addReply.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getReply.pending]: (state, action) => {
      state.loading = true;
    },
    [getReply.fulfilled]: (state, action) => {
      state.loading = false;
      state.reply = action.payload;
    },
    [getReply.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setReply, setReplies } = replySlice.actions;

export default replySlice.reducer;
