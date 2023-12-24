import React, { useEffect } from "react";
import UserProfile from "../components/UserProfile";
import Posts from "../components/Posts";
import { StyleSheet, View } from "react-native";
import { selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";

import { fatchMorePosts, fatchPosts } from "../redux/operations";
import { cleanPosts } from "../redux/slices/postSlice";

export const PostsScreen = () => {
  const dispatch = useDispatch();
  const { posts, lastVisible, isLastPost, loading } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(cleanPosts());
    dispatch(
      fatchPosts({
        collectionName: "posts",
        type: "default",
      })
    );
  }, []);

  const fetchMoreHandler = () => {
    if (!loading && !isLastPost) {
      dispatch(
        fatchMorePosts({
          collectionName: "posts",
          type: "default",
          lastVisible: lastVisible,
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      <UserProfile />
      <Posts posts={posts} loading={loading} fetchMore={fetchMoreHandler} />
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
