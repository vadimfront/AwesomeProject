import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

export const ButtonCustom = ({ onPress, children, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.btn, { ...style }]} onPress={onPress}>
      <Text style={[styles.btnText, { ...textStyle }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginTop: 27,
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.btnBgColor,
    borderRadius: 100,
  },
  btnText: {
    textAlign: "center",
    color: colors.btnTextColor,
  },
});
