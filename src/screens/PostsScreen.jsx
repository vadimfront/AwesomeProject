import React from "react";
import UserProfile from "../components/UserProfile";
import Posts from "../components/Posts";
import { StyleSheet, View } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <UserProfile />
      <Posts />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
