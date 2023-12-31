import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { CommentsList } from "../components/CommentsList";
import { CommentForm } from "../components/CommentForm";

import KeyboardAvoidingContainer from "../components/KeyboardAvoidingContainer";
import { selectComments, selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { fatchComments } from "../redux/operations";

import { LoadingSpinner } from "../components/LoadingSpinner";
import { colors } from "../constants/colors";
import { updateCommentsInPost } from "../redux/slices/postSlice";

export const CommentsScreen = () => {
  const {
    params: { postId },
  } = useRoute();

  const { posts, ownPosts } = useSelector(selectPosts);
  const { comments, loading } = useSelector(selectComments);

  const [fixed, setFixed] = useState(false);
  const dispatch = useDispatch();

  const fetchComments = () => {
    dispatch(
      fatchComments({
        collectionName: "posts",
        type: "own",
        fieldName: "id",
        equalToFieldName: postId,
      })
    );
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    dispatch(updateCommentsInPost({ postId, newComments: comments }));
  }, [comments]);

  //const postsData = posts.length ? posts : ownPosts;

  // useEffect(() => {
  //   dispatch(
  //     fatchPosts({
  //       collectionName: "posts",
  //       type: "default",
  //     })
  //   );
  // }, [status]);

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
  const postsData = posts.length ? posts : ownPosts;
  const index = postsData.findIndex((post) => post.id === postId);
  // const commentsData = postsData[index]?.comments;

  return (
    <>
      <KeyboardAvoidingContainer
        offsetAndroid={90}
        offsetIos={90}
        keyboardDismissOff={true}
      >
        <View style={styles.container}>
          <Animated.Image
            src={postsData[index]?.postImage}
            style={[imageStyle, { opacity: fadeAnim }]}
          />

          <CommentsList commentsData={comments} fetchComments={fetchComments} />

          <CommentForm postId={postId} handlerFocus={handlerFocus} />
        </View>
      </KeyboardAvoidingContainer>
      <LoadingSpinner
        loading={loading}
        overlayColor={colors.btnBgColor}
        text="Загрузка..."
      />
    </>
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
