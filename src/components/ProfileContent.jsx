import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { colors } from "../constants/colors";

const ProfileContent = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.formBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
});

export default ProfileContent;
