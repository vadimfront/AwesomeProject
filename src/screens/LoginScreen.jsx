import React from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { LoginForm } from "../components/LoginForm";
import bg from "../assets/images/RegistrationScreenBg.jpg";

export const LoginScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-200}
        style={styles.container}
      >
        <ImageBackground style={styles.image} source={bg}>
          <LoginForm />
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
    resizeMode: "cover",
  },
});
