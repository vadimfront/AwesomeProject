import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import store from "./src/redux/store";

import { useFonts } from "expo-font";
import MainRouter from "./src/routes/MainRouter";
import Toast from "react-native-toast-message";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <MainRouter />
        <Toast />
      </PersistGate>
    </Provider>
  );
}
