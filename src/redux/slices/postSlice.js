import { createSlice } from "@reduxjs/toolkit";
import { createPost, fatchMorePosts, fatchPosts } from "../operations";

const initialState = {
  posts: [],
  ownPosts: [],
  lastVisible: null,
  isLastPost: false,
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanPosts: (state) => {
      state.posts = initialState.posts;
      state.ownPosts = initialState.ownPosts;
      state.lastVisible = initialState.lastVisible;
      state.isLastPost = initialState.isLastPost;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.isLastPost = false;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.loading = false;
    });
    /// Fetch posts
    builder.addCase(fatchPosts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fatchPosts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.lastVisible = payload.lastVisible;
      if (payload.type === "default") {
        state.posts = payload.documents;
      } else if (payload.type === "own") {
        state.ownPosts = payload.documents;
      }
    });
    builder.addCase(fatchPosts.rejected, (state, { payload }) => {
      state.error = payload;
    });
    /// Fetch more
    builder.addCase(fatchMorePosts.pending, (state) => {
      state.error = false;
    });
    builder.addCase(fatchMorePosts.fulfilled, (state, { payload }) => {
      state.lastVisible = payload.lastVisible;
      state.isLastPost = payload.isLastPost;
      if (payload.type === "default" && payload.documents.length > 0) {
        state.posts.push(...payload.documents);
      } else if (payload.type === "own" && payload.documents.length > 0) {
        state.ownPosts.push(...payload.documents);
      }
    });
    builder.addCase(fatchMorePosts.rejected, (state, { payload }) => {
      state.error = payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const { cleanPosts, changeLikes } = postsSlice.actions;
