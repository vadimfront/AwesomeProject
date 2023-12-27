import { createSlice } from "@reduxjs/toolkit";
import { createPostComment } from "../operations";

const initialState = {
  status: "idle",
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPostComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPostComment.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
    });
    builder.addCase(createPostComment.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
