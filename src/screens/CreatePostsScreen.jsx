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
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={styles.defaultFlex}
        contentContainerStyle={styles.flexGrow}
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
  defaultFlex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
  },
});
