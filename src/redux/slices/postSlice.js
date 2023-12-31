import { createSlice } from "@reduxjs/toolkit";
import { createPost, fatchMorePosts, fatchPosts } from "../operations";

const initialState = {
  posts: [],
  ownPosts: [],
  lastVisible: null,
  isLastPost: false,
  loading: false,
  loadingMore: false,
  status: "idle",
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
    refreshStatus: (state) => {
      state.status = initialState.status;
    },
    refreshPagination: (state) => {
      state.lastVisible = initialState.lastVisible;
      state.isLastPost = initialState.isLastPost;
    },
    updatePostsAfterLike: (state, { payload: { type, likes, postId } }) => {
      if (type === "ownPosts") {
        state.ownPosts.map((post) => {
          if (post.id === postId) {
            post.likes = likes;
          }
        });
      } else {
        state.posts.map((post) => {
          if (post.id === postId) {
            post.likes = likes;
          }
        });
      }
    },
    updateCommentsInPost: (state, { payload: { postId, newComments } }) => {
      const index = state.posts.findIndex((post) => post.id === postId);
      if (index === -1) return;
      state.posts[index].comments = newComments;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.posts = payload;
    });
    builder.addCase(createPost.rejected, (state, { payload }) => {
      state.status = "failed";
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
      state.loadingMore = true;
      state.error = false;
    });
    builder.addCase(fatchMorePosts.fulfilled, (state, { payload }) => {
      state.lastVisible = payload.lastVisible;
      state.loadingMore = false;
      if (payload.type === "default" && payload.documents.length > 0) {
        state.posts = [...state.posts, ...payload.documents];
        return;
      } else if (payload.type === "own" && payload.documents.length > 0) {
        state.ownPosts = [...state.ownPosts, ...payload.documents];
        return;
      }
      state.isLastPost = payload.isLastPost;
    });
    builder.addCase(fatchMorePosts.rejected, (state, { payload }) => {
      state.error = payload;
      state.loadingMore = false;
    });
  },
});

export const postsReducer = postsSlice.reducer;
export const {
  cleanPosts,
  refreshStatus,
  refreshPagination,
  updatePostsAfterLike,
  updateCommentsInPost,
} = postsSlice.actions;
