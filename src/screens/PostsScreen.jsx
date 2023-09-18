import React from "react";
import UserProfile from "../components/UserProfile";
import { postData } from "../constants/temporary";
import Posts from "../components/Posts";
import { StyleSheet, View } from "react-native";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <UserProfile />
      {postData && <Posts postData={postData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
