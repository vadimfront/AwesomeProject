import React from "react";
import { PostForm } from "../components/PostForm";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";

export const CreatePostsScreen = () => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -60 : -30}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.container}>
          <PostForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
});
