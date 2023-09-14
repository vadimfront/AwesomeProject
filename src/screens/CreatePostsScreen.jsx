import React from "react";
import { PostForm } from "../components/PostForm";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";

export const CreatePostsScreen = () => {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      <KeyboardAvoidingContainer offsetAndroid={-30} offsetIos={-60}>
        <View style={styles.container}>
          <PostForm />
        </View>
      </KeyboardAvoidingContainer>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
});
