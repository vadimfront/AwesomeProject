import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import bg from "../assets/images/RegistrationScreenBg.jpg";
import { RegistrationForm } from "../components/RegistrationForm";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";

export const RegistrationScreen = () => {
  return (
    <KeyboardAvoidingContainer offsetAndroid={-180} offsetIos={-170}>
      <ImageBackground style={styles.image} source={bg}>
        <RegistrationForm />
      </ImageBackground>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
