import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { loginDB, registerDB } from "../firebase/auth";
import {
  fetchAllDataFirestore,
  fetchSingleFirestore,
  replaceDataInFirestore,
  updateDataInFirestore,
  writeDataToFirestore,
} from "../firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uploadImageToStorage, uriToBlob } from "../helpers/helpers";
import { avatarPlaceholder } from "../constants/constants";

export const signUp = createAsyncThunk(
  "users/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password, userName, userProfileImage } = data;
      const userAvatarUri = userProfileImage || avatarPlaceholder;

      const userId = await registerDB({ email, password });

      if (!userId) return;

      const storage = getStorage();

      const blobFile = await uriToBlob(userAvatarUri);
      if (blobFile.size > 1000000) {
        console.log("size more then 1mb");
        return;
      }

      const metadata = {
        contentType: "image/jpg",
      };

      const storageRef = ref(storage, "users/" + userId + "/profile.jpg");

      await uploadBytes(storageRef, blobFile, metadata);

      const downloadURL = await getDownloadURL(storageRef);

      const fireStoreData = {
        userId: userId,
        userName: userName,
        userProfileImage: { type: "default", url: downloadURL },
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

      const imageParams = {
        imageId: data.docId,
        imageUrl: data.userProfileImage.url,
        imageName: "profile",
        folderName: "users",
      };

      const downloadURL = await uploadImageToStorage({ ...imageParams });

      const params = {
        userProfileImage: {
          type: String(data.userProfileImage.type),
          url: downloadURL,
        },
      };
      await replaceDataInFirestore("users", "userId", data.docId, params);
      return params;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const fetchPosts = createAsyncThunk("posts/fetchAllPosts", async () => {
  try {
    const postsData = await fetchAllDataFirestore("posts");

    if (!postsData) return;

    return postsData;
  } catch (error) {
    return rejectWithValue(error.code);
  }
});

export const updateLike = createAsyncThunk(
  "posts/updateLike",
  async ({ postId, newArrLikes }, { rejectWithValue }) => {
    console.log("else", postId, newArrLikes);
    try {
      await updateDataInFirestore("posts", "id", "likes", postId, newArrLikes);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const createPostComment = createAsyncThunk(
  "posts/createPostComment",
  async ({ postId, commentData }, { rejectWithValue }) => {
    try {
      console.log(postId, commentData);

      commentData[0].commentId = `comment_${nanoid()}`;

      await updateDataInFirestore(
        "posts",
        "id",
        "comments",
        postId,
        commentData
      );
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

      const postsData = await fetchAllDataFirestore("posts");

      if (!postsData) return;

      return postsData;
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);
