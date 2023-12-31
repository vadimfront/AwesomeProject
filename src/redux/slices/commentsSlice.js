import { createSlice } from "@reduxjs/toolkit";
import { createPostComment, fatchComments } from "../operations";

const initialState = {
  loading: false,
  status: "idle",
  comments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    // Create comment
    builder.addCase(createPostComment.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPostComment.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.comments = payload;
    });
    builder.addCase(createPostComment.rejected, (state) => {
      state.status = "failed";
    });
    // Fetch comments
    builder.addCase(fatchComments.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(fatchComments.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
      state.status = "succeeded";
    });
    builder.addCase(fatchComments.rejected, (state) => {
      state.loading = false;
      state.status = "loading";
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
