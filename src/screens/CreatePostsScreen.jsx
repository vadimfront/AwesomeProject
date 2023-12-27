import React, { useEffect } from "react";
import { PostForm } from "../components/PostForm";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { toastMessage } from "../helpers/toastMessage";
import { selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { refreshStatus } from "../redux/slices/postSlice";

export const CreatePostsScreen = () => {
  const { status } = useSelector(selectPosts);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(refreshStatus());
      navigation.navigate("PostsScreen");
    } else if (status === "failed") {
      toastMessage(
        "error",
        "Opps...",
        "Something went wrong! Please try again."
      );
      dispatch(refreshStatus());
    }
  }, [status]);

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
