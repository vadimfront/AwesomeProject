import React from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

export const ButtonCustom = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{children}</Text>
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
