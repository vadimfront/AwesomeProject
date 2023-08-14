import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <RegistrationScreen onLayout={onLayoutRootView} />;
}
