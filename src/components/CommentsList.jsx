import React from "react";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { FlatList } from "react-native";
import { selectAuth } from "../redux/selectors/userSelectors";
import { useSelector } from "react-redux";

export const CommentsList = ({ commentsData }) => {
  const { auth } = useSelector(selectAuth);
  return (
    <>
      {commentsData.length ? (
        <FlatList
          data={commentsData}
          inverted={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "column-reverse",
          }}
          renderItem={({ item }) => (
            <View
              key={item.commentId}
              style={[
                styles.comment,
                item.userId === auth && styles.commentReverse,
              ]}
            >
              <Image style={styles.avatar} src={item.userProfileImage.url} />
              <View style={styles.commentTextWrap}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <Text style={styles.commentDate}>{item.date}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.message}>There is no comments to read</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  commentReverse: {
    flexDirection: "row-reverse",
  },
  commentImg: {
    flexBasis: 28,
  },
  commentTextWrap: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.commentsMessage,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 10,
    color: "#BDBDBD",
    fontFamily: fonts.baseFontRegular,
  },
  message: {
    flex: 1,
  },
});
