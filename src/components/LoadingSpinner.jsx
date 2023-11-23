import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

export const LoadingSpinner = ({ loading, overlayColor, text }) => {
  return (
    <AnimatedLoader
      visible={loading}
      overlayColor={overlayColor}
      source={require("../assets/loading-animation.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text style={styles.text}>{text}</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
});
