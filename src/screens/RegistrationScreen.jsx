import React from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import bg from "../assets/images/RegistrationScreenBg.jpg";
import { RegistrationForm } from "../components/RegistrationForm";

export const RegistrationScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground style={styles.image} source={bg}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={-170}
          style={styles.container}
        >
          <RegistrationForm />
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
  },
});
