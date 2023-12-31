import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { postsReducer } from "./slices/postSlice";
import { likesReducer } from "./slices/likesSlice";
import { commentsReducer } from "./slices/commentsSlice";
import { authReducer } from "./slices/authSlice";
import { usersReducer } from "./slices/usersSlice";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["posts"],
};

const userPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["auth", "profile"],
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authReducer),
  users: usersReducer,
  posts: postsReducer,
  likes: likesReducer,
  comments: commentsReducer,
});

const reducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { store, persistor };
