import { createSlice } from "@reduxjs/toolkit";
import { login, signUp, updateProfileImage } from "../operations";
import { avatarPlaceholder } from "../../constants/constants";

const initialState = {
  auth: null,
  profile: {
    email: null,
    userId: null,
    userName: null,
    userProfileImage: {
      type: "default",
      url: avatarPlaceholder,
    },
  },
  loading: false,
  error: false,
  errorMessage: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logOut: (state) => {
      state.auth = initialState.auth;
      state.profile = initialState.profile;
    },
    resetError: (state) => {
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      const { userId, email, userName, userProfileImage } = payload;
      state.loading = false;
      state.errorMessage = null;
      state.error = null;
      state.auth = userId;
      state.profile = { email, userName, userProfileImage };
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload;
    });

    builder.addCase(login.pending, (state) => {
      state.error = null;
      state.loading = true;
      state.errorMessage = null;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { userId, email, userName, userProfileImage } = payload;
      state.loading = false;
      state.auth = userId;
      state.profile = { email, userName, userProfileImage };
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload;
    });
    builder.addCase(updateProfileImage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.profile = { ...state.profile, ...payload };
    });
    builder.addCase(updateProfileImage.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload;
    });
  },
});

export const { logOut, resetError } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
