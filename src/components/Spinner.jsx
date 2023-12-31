import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

const Spinner = () => {
  return (
    <ActivityIndicator
      style={styles.spinner}
      size={40}
      color={colors.spinnerColor}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Spinner;
