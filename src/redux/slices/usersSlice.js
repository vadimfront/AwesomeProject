import { createSlice } from "@reduxjs/toolkit";
import { fatchAllUsers, updateLike } from "../operations";

const initialState = {
  users: [],
  status: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fatchAllUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fatchAllUsers.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.users = payload;
    });
    builder.addCase(fatchAllUsers.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const usersReducer = usersSlice.reducer;
