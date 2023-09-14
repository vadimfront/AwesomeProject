import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../constants/colors";
import { fontSizes } from "../constants/fontSizes";

export const InputCustom = ({
  handleChange,
  value,
  inputName,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(null);
  return (
    <TextInput
      value={value[inputName]}
      onChangeText={handleChange(inputName)}
      autoComplete="off"
      placeholderTextColor={colors.inputPlaceholderColor}
      style={[
        styles.input,
        isFocused === inputName && styles.focusedInput,
        { ...style },
      ]}
      onFocus={() => setIsFocused(inputName)}
      onBlur={() => setIsFocused(null)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
});
