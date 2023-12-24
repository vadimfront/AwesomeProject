import React from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { TextInput, View } from "react-native";
import { ButtonIcon } from "./ButtonIcon";
import { colors } from "../constants/colors";
import { Keyboard } from "react-native";
import { selectAuth, selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { createPostComment } from "../redux/operations";
import { getCurrentDateAndTime } from "../helpers/helpers";

export const CommentForm = ({ postId, handlerFocus }) => {
  const dispatch = useDispatch();

  const { posts } = useSelector(selectPosts);
  const { profile, auth } = useSelector(selectAuth);

  const currentPostIndex = posts.findIndex((post) => post.id === postId);

  const createPostHendler = ({ comment, resetForm }) => {
    const commentData = [
      ...posts[currentPostIndex].comments,
      {
        userId: auth,
        ...profile,
        comment,
        date: getCurrentDateAndTime(),
      },
    ];

    dispatch(createPostComment({ postId, commentData }));
    Keyboard.dismiss();
    resetForm();
  };

  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={({ comment }, { resetForm }) => {
        createPostHendler({ comment, resetForm });
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.commentForm}>
          <View style={styles.groupWrap}>
            <TextInput
              onChangeText={handleChange("comment")}
              onBlur={() => handlerFocus(false)}
              value={values.comment}
              style={styles.inputComment}
              placeholder="Коментувати..."
              onFocus={() => handlerFocus(true)}
            />

            <ButtonIcon
              onPressHandler={handleSubmit}
              iconName="arrow-up"
              style={styles.btnComment}
              color="#fff"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  commentForm: {
    paddingVertical: 16,
    justifyContent: "flex-end",
  },
  groupWrap: {
    position: "relative",
    justifyContent: "center",
  },
  inputComment: {
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 100,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 52,
  },
  btnComment: {
    width: 34,
    height: 34,
    position: "absolute",
    right: 8,
    backgroundColor: colors.btnBgColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
