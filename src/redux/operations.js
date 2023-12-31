import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { loginDB, registerDB } from "../firebase/auth";
import {
  fetchData,
  fetchMoreData,
  fetchSingleFirestore,
  replaceDataInFirestore,
  updateDataInFirestore,
  writeDataToFirestore,
} from "../firebase/firestore";
import { uploadImageToStorage } from "../helpers/helpers";
import { avatarPlaceholder } from "../constants/constants";

export const signUp = createAsyncThunk(
  "users/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password, userName, userProfileImage } = data;

      const userAvatarUri = userProfileImage || avatarPlaceholder;

      const userId = await registerDB({ email, password });

      if (!userId) return;

      const imageParams = {
        imageId: userId,
        imageUrl: userAvatarUri,
        imageName: "profile",
        folderName: "users",
      };

      const downloadURL = await uploadImageToStorage({ ...imageParams });

      const fireStoreData = {
        userId: userId,
        userName: userName,
        userProfileImage: {
          type: userProfileImage ? "own" : "default",
          url: downloadURL,
        },
        email: email,
      };

      await writeDataToFirestore("users", fireStoreData);

      return fireStoreData;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const userId = await loginDB({ email, password });

      if (!userId) return;

      const userData = await fetchSingleFirestore({
        collectionName: "users",
        fieldName: "userId",
        equalValue: userId,
      });
      if (!userData) return;

      const newData = {
        userId: userId,
        userName: userData.userName,
        userProfileImage: userData.userProfileImage,
        email: userData.email,
      };

      return newData;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "users/update",
  async (data, { rejectWithValue }) => {
    try {
      if (!data) throw new Error("data is undefined");
      const {
        userProfileImage: { url, type },
        userId,
        hasPosts,
      } = data;

      const imageParams = {
        imageId: nanoid(),
        imageUrl: url,
        imageName: "profile",
        folderName: "users",
      };

      const downloadURL = await uploadImageToStorage({ ...imageParams });

      const params = {
        userProfileImage: {
          type: type,
          url: downloadURL,
        },
      };

      await replaceDataInFirestore({
        collectionName: "users",
        fieldName: "userId",
        value: userId,
        data: params,
      });
      if (hasPosts) {
        await updateDataInFirestore({
          collectionName: "posts",
          fieldName: "author.id",
          updateAt: "author.photo",
          equalValue: userId,
          value: url,
        });
      }
      return params;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const updateLike = createAsyncThunk(
  "likes/updateLike",
  async ({ postId, newArrLikes }, { rejectWithValue }) => {
    try {
      await updateDataInFirestore({
        collectionName: "posts",
        fieldName: "id",
        updateAt: "likes",
        equalValue: postId,
        value: newArrLikes,
      });
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fatchPosts = createAsyncThunk(
  "posts/fatchPosts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchData(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fatchAllUsers = createAsyncThunk(
  "users/fatchAllUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchSingleFirestore(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fatchMorePosts = createAsyncThunk(
  "posts/fatchMorePosts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchMoreData(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fatchComments = createAsyncThunk(
  "comments/fatchComments",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchData(params);
      return response.documents[0]?.comments;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const createPostComment = createAsyncThunk(
  "comments/createPostComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      await updateDataInFirestore({
        collectionName: "posts",
        fieldName: "id",
        updateAt: "comments",
        equalValue: postId,
        value: commentData,
      });
      const response = await fetchData({
        collectionName: "posts",
        type: "default",
        fieldName: "id",
        equalToFieldName: postId,
      });
      return response.documents[0]?.comments;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue }) => {
    try {
      const imageParams = {
        imageId: nanoid(),
        imageUrl: data.postImage,
        imageName: "post",
        folderName: "posts",
      };

      const downloadURL = await uploadImageToStorage({ ...imageParams });

      const postData = {
        ...data,
        id: nanoid(),
        postImage: downloadURL,
        comments: [],
        likes: [],
      };

      await writeDataToFirestore("posts", postData);

      const updatedData = await fetchData({
        collectionName: "posts",
        type: "default",
      });

      return updatedData.documents;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
