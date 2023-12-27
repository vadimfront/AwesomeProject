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
import { usersReducer } from "./slices/usersSlice";
import { postsReducer } from "./slices/postSlice";
import { likesReducer } from "./slices/likesSlice";
import { commentsReducer } from "./slices/commentsSlice";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["posts"],
};

const userPersistConfig = {
  key: "user",
  storage: AsyncStorage,
  whitelist: ["auth", "profile"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, usersReducer),
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

// AsyncStorage.getItem("posts", (err, result) => {
//   if (!err) {
//     const userData = JSON.parse(result);
//     console.log("User Data:", userData);
//   } else {
//     console.error("Error reading user data from AsyncStorage:", err);
//   }
// });

export default { store, persistor };
