import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { CommentsList } from "../components/CommentsList";
import { CommentForm } from "../components/CommentForm";

import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import { selectPosts } from "../redux/selectors/userSelectors";
import { useSelector } from "react-redux";

export const CommentsScreen = () => {
  const {
    params: { postId },
  } = useRoute();

  const { posts } = useSelector(selectPosts);
  const [fixed, setFixed] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fixed ? fadeOut() : fadeIn();
  }, [fixed]);

  const handlerFocus = (isFocused) => {
    setFixed(isFocused);
  };

  const imageStyle = fixed ? styles.fixedPostImg : styles.postImg;

  const index = posts.findIndex((post) => post.id === postId);
  const commentsData = posts[index]?.comments;
  return (
    <KeyboardAvoidingContainer
      offsetAndroid={90}
      offsetIos={90}
      keyboardDismissOff={true}
    >
      <View style={styles.container}>
        <Animated.Image
          src={posts[index]?.postImage}
          style={[imageStyle, { opacity: fadeAnim }]}
        />

        <CommentsList commentsData={commentsData} />

        <CommentForm postId={postId} handlerFocus={handlerFocus} />
      </View>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  postImg: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
    opacity: 1,
    height: 240,
  },
  fixedPostImg: {
    opacity: 0,
    height: 0,
  },
  container: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
