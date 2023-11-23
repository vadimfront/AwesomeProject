import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { fontSizes } from "../constants/fontSizes";

import LikeModule from "./LikeModule";
import CommentModule from "./CommentModule";
import LocationModule from "./LocationModule";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, selectPosts } from "../redux/selectors/userSelectors";
import { useEffect } from "react";
import { fetchPosts } from "../redux/operations";
import { LoadingSpinner } from "./LoadingSpinner";
import { colors } from "../constants/colors";
import { subscribeToFirestoreCollection } from "../firebase/firestore";
import { implamentChanges } from "../redux/slices/postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(selectPosts);
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    const updateFunc = (data) => {
      dispatch(implamentChanges(data));
    };
    const unsubscribe = subscribeToFirestoreCollection("posts", updateFunc);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {posts ? (
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          //keyExtractor={(item) => }
          renderItem={({ item }) => {
            const {
              id,
              postTitle,
              postImage,
              location,
              comments,
              likes,
              author,
              date,
            } = item;
            return (
              <View style={styles.postWrap} key={id}>
                <View style={styles.authorWrap}>
                  <View style={styles.authorInfo}>
                    <Text>{author.name}</Text>
                    <Text>{date}</Text>
                  </View>
                  <Image style={styles.authorPhoto} src={author.photo} />
                </View>
                <Image src={postImage} style={styles.postImg} />
                <Text style={styles.postText}>{postTitle}</Text>
                <View style={styles.postModule}>
                  <View style={styles.postModuleItem}>
                    <CommentModule
                      commentsCount={comments ? comments.length : 0}
                      postId={id}
                    />
                    {likes && (
                      <LikeModule likes={likes} postId={id} userId={auth} />
                    )}
                  </View>
                  {location?.address && <LocationModule location={location} />}
                </View>
              </View>
            );
          }}
        ></FlatList>
      ) : (
        <Text>На жаль постів немає</Text>
      )}
      <LoadingSpinner
        loading={loading}
        overlayColor={colors.btnBgColor}
        text="Загрузка..."
      />
    </>
  );
};

const styles = StyleSheet.create({
  postWrap: {
    flex: 1,
    marginBottom: 32,
  },
  postImg: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postText: {
    fontSize: fontSizes.defaultText,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
  },
  postModule: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 24,
    marginTop: 10,
  },
  postModuleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  authorInfo: {},
  authorPhoto: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
});

export default Posts;
