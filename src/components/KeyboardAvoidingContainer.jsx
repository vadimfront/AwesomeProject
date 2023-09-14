import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const KeyboardAvoidingContainer = ({
  children,
  offsetIos = 0,
  offsetAndroid = 0,
  keyboardDismissOff = false,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      disabled={keyboardDismissOff}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({
          ios: offsetIos,
          android: offsetAndroid, // Adjust this value based on your UI
        })}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoidingContainer;
