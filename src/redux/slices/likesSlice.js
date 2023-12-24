import { createSlice } from "@reduxjs/toolkit";
import { updateLike } from "../operations";

const initialState = {
  status: "idle",
};

const likesSlice = createSlice({
  name: "likes",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateLike.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateLike.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(updateLike.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const likesReducer = likesSlice.reducer;
