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

      const userData = await fetchSingleFirestore("users", "userId", userId);
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

      await replaceDataInFirestore("users", "userId", userId, params);
      if (hasPosts) {
        await updateDataInFirestore(
          "posts",
          "author.id",
          "author.photo",
          userId,
          url
        );
      }
      return params;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.code);
    }
  }
);

export const updateLike = createAsyncThunk(
  "likes/updateLike",
  async ({ postId, newArrLikes }, { rejectWithValue }) => {
    try {
      await updateDataInFirestore("posts", "id", "likes", postId, newArrLikes);
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      return rejectWithValue(error.code);
    }
  }
);

export const createPostComment = createAsyncThunk(
  "posts/createPostComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      commentData[0].commentId = `comment_${nanoid()}`;

      await updateDataInFirestore(
        "posts",
        "id",
        "comments",
        postId,
        commentData
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.code);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
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

      const postsData = await fetchData("posts");

      if (!postsData) return;

      return postsData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.code);
    }
  }
);

// export const updatePostsAuhtor = createAsyncThunk(
//   "posts/updatePostsAuthor",
//   async ({ updatedData, userId }, { rejectWithValue }) => {
//     try {
//       // collectionName,
//       // fieldName,
//       // updateAt,
//       // equalValue,
//       // value

//       await updateDataInFirestore(
//         "posts",
//         "author.id",
//         "photo",
//         userId,
//         updatedData
//       );
//     } catch (error) {
//       console.log("errorrrr", error);
//       return rejectWithValue(error.code);
//     }
//   }
// );
