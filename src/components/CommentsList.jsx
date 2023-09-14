import React from "react";
import { StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { FlatList } from "react-native";
import { Dimensions } from "react-native";
import { Keyboard } from "react-native";

export const CommentsList = ({ commentsData }) => {
  return (
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
            item.userId === "u1" && styles.commentReverse,
          ]}
        >
          <Image source={item.avatar} />
          <View style={styles.commentTextWrap}>
            <Text style={styles.commentText}>{item.comment}</Text>
            <Text style={styles.commentDate}>{item.date}</Text>
          </View>
        </View>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

const styles = StyleSheet.create({
  comment: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
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
  },
  commentText: {
    marginBottom: 8,
  },
  commentDate: {
    fontSize: 10,
    color: "#BDBDBD",
    fontFamily: fonts.baseFontRegular,
  },
});
