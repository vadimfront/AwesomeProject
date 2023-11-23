import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { LoginForm } from "../components/LoginForm";
import bg from "../assets/images/RegistrationScreenBg.jpg";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";

export const LoginScreen = () => {
  return (
    <>
      <KeyboardAvoidingContainer offsetAndroid={-230} offsetIos={-220}>
        <ImageBackground style={styles.image} source={bg}>
          <LoginForm />
        </ImageBackground>
      </KeyboardAvoidingContainer>
    </>
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
