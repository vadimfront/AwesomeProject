import React from "react";
import { ButtonNavigationIcon } from "./ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { Text, StyleSheet } from "react-native";

const CommentModule = ({ postComments = 0, postId }) => {
  return (
    <ButtonNavigationIcon
      iconName="message-circle"
      color={postComments ? colors.activeColor : colors.iconColor}
      navigateTo="Comments"
      params={{ postId }}
      style={styles.commentsModule}
    >
      <Text
        style={{
          color: postComments ? colors.baseTextColor : colors.iconColor,
        }}
      >
        {postComments}
      </Text>
    </ButtonNavigationIcon>
  );
};

const styles = StyleSheet.create({
  commentsModule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default CommentModule;
