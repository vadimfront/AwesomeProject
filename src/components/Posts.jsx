import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { fontSizes } from "../constants/fontSizes";

import LikeModule from "./LikeModule";
import CommentModule from "./CommentModule";
import LocationModule from "./LocationModule";
import { useSelector } from "react-redux";
import { selectAuth, selectPosts } from "../redux/selectors/userSelectors";
import { LoadingSpinner } from "./LoadingSpinner";
import { colors } from "../constants/colors";
import Spinner from "./Spinner";

const Posts = ({ posts, fetchInitialPosts, fetchMore, likeHandler }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { loading, loadingMore } = useSelector(selectPosts);
  const { auth } = useSelector(selectAuth);

  const onRefresh = () => {
    setRefreshing(true);
    fetchInitialPosts();
  };

  useEffect(() => {
    if (!loading && refreshing) {
      setRefreshing(false);
    }
  }, [loading]);

  return (
    <>
      {posts && posts.length > 0 ? (
        <>
          <FlatList
            data={posts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReached={fetchMore}
            onEndReachedThreshold={0.2}
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
                <View style={styles.postWrap}>
                  <View style={styles.authorWrap}>
                    <View style={styles.authorInfo}>
                      <Text>{author?.name}</Text>
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
                        <LikeModule
                          likes={likes}
                          postId={id}
                          userId={auth}
                          likeHandler={likeHandler}
                        />
                      )}
                    </View>
                    {location?.address && (
                      <LocationModule location={location} />
                    )}
                  </View>
                </View>
              );
            }}
          ></FlatList>
          {loadingMore && <Spinner />}
        </>
      ) : (
        <Text>На жаль постів немає</Text>
      )}

      {!refreshing && (
        <LoadingSpinner
          loading={loading}
          overlayColor={colors.btnBgColor}
          text="loading..."
        />
      )}
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
