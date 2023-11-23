import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx3LJd5FgDNMXygKUfrJEMxfKxRn0X8g4",
  authDomain: "awesomeproject-399916.firebaseapp.com",
  projectId: "awesomeproject-399916",
  storageBucket: "awesomeproject-399916.appspot.com",
  messagingSenderId: "340389482642",
  appId: "1:340389482642:web:cce8fb850eed98759c164b",
};
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
