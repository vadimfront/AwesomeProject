import React, { useEffect, useMemo } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { Image, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { fonts } from "../constants/fonts";
import { FlatList } from "react-native";
import {
  selectAuth,
  selectComments,
  selectUsers,
} from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { fatchAllUsers } from "../redux/operations";

export const CommentsList = ({ commentsData, fetchComments }) => {
  const { auth } = useSelector(selectAuth);
  const { loading, status } = useSelector(selectComments);
  const { users } = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fatchAllUsers({ collectionName: "users" }));
  }, [dispatch]);

  const memoizedUsers = useMemo(() => users, [users]);

  return (
    <>
      {commentsData && commentsData.length > 0 ? (
        <FlatList
          data={commentsData}
          inverted={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "column-reverse",
          }}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchComments} />
          }
          renderItem={({ item }) => {
            const index = memoizedUsers.findIndex(
              (user) => user.userId === auth
            );
            return (
              <View
                style={[
                  styles.comment,
                  item.userId === auth && styles.commentReverse,
                ]}
              >
                <Image
                  style={styles.avatar}
                  src={users[index].userProfileImage.url}
                />
                <View style={styles.commentTextWrap}>
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <Text style={styles.commentDate}>{item.date}</Text>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text style={styles.message}>There is no comments to read</Text>
      )}
      {status === "loading" && <Spinner />}
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
