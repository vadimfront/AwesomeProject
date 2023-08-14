import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../constants/colors";
import { fontSizes } from "../constants/FontSizes";

export const InputCustom = ({ handleChange, values, inputName, ...props }) => {
  const [isFocused, setIsFocused] = useState(null);
  return (
    <TextInput
      value={values[inputName]}
      onChangeText={handleChange(inputName)}
      autoComplete="off"
      placeholderTextColor={colors.inputPlaceholderColor}
      style={[styles.input, isFocused === inputName && styles.focusedInput]}
      onFocus={() => setIsFocused(inputName)}
      onBlur={() => setIsFocused(null)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    padding: 16,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.inputBorder,
    backgroundColor: colors.inputBg,
    fontSize: fontSizes.defaultText,
  },
  focusedInput: {
    backgroundColor: "#fff",
    borderColor: colors.inpurtBorderFocused,
  },
  togglerPassword: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    right: 16,
  },
  togglerPasswordText: {
    color: colors.linkColor,
  },
  linkRegister: {
    fontSize: fontSizes.defaultText,
    marginTop: 16,
    textAlign: "center",
    color: colors.linkColor,
  },
});
