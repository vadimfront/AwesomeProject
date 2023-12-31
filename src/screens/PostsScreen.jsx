import React, { useEffect } from "react";
import UserProfile from "../components/UserProfile";
import Posts from "../components/Posts";
import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";

import { fatchMorePosts, fatchPosts } from "../redux/operations";
import {
  cleanPosts,
  refreshPagination,
  refreshStatus,
  updatePostsAfterLike,
} from "../redux/slices/postSlice";
import { logOut } from "../redux/slices/authSlice";
import { useNavigation, useRoute } from "@react-navigation/native";

export const PostsScreen = () => {
  const dispatch = useDispatch();
  const { posts, lastVisible, isLastPost, loading } = useSelector(selectPosts);

  const navigation = useNavigation();
  const route = useRoute();

  const fetchInitialPosts = () => {
    dispatch(refreshPagination());
    dispatch(
      fatchPosts({
        collectionName: "posts",
        type: "default",
      })
    );
  };

  useEffect(() => {
    dispatch(refreshPagination());
    fetchInitialPosts();
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

  const likeHandler = ({ likes, postId }) => {
    dispatch(
      updatePostsAfterLike({
        type: "posts",
        likes: likes,
        postId: postId,
      })
    );
  };

  return (
    <View style={styles.container}>
      <UserProfile />
      <Posts
        posts={posts}
        fetchInitialPosts={fetchInitialPosts}
        fetchMore={fetchMoreHandler}
        likeHandler={likeHandler}
      />
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
