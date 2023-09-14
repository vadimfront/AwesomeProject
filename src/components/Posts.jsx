import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { fontSizes } from "../constants/fontSizes";

import LikeModule from "./LikeModule";
import CommentModule from "./CommentModule";
import LocationModule from "./LocationModule";

const Posts = ({ postData }) => {
  return (
    <>
      {postData.map(
        ({
          postId,
          postImage,
          postTitle,
          postLikes,
          postComments,
          location,
        }) => (
          <View style={styles.postWrap} key={postId}>
            <Image source={postImage} style={styles.postImg} />
            <Text style={styles.postText}>{postTitle}</Text>
            <View style={styles.postModule}>
              <View style={styles.postModuleItem}>
                <CommentModule postComments={postComments} postId={postId} />
                <LikeModule postLikes={postLikes} />
              </View>
              <LocationModule location={location} />
            </View>
          </View>
        )
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
    justifyContent: "space-between",
    gap: 24,
    marginTop: 10,
  },
  postModuleItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default Posts;
