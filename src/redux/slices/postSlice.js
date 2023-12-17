import { createSlice } from "@reduxjs/toolkit";
import { createPost, updateLike } from "../operations";

const initialState = {
  posts: [],
  ownPosts: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    implamentChanges: (state, { payload }) => {
      const { data, isOwnPosts } = payload;

      if (isOwnPosts && data) {
        state.ownPosts = data;
      } else if (!isOwnPosts && data) {
        state.posts = data;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.posts = payload;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(updateLike.pending, (state) => {
      state.error = false;
    });
    builder.addCase(updateLike.fulfilled, (state, { payload }) => {
      state.error = false;
    });
    builder.addCase(updateLike.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { implamentChanges, changeLikes } = postsSlice.actions;
