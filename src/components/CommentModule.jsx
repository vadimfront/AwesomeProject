import React from "react";
import { ButtonNavigationIcon } from "./ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { Text, StyleSheet } from "react-native";

const CommentModule = ({ commentsCount, postId }) => {
  return (
    <ButtonNavigationIcon
      iconName="message-circle"
      color={commentsCount ? colors.activeColor : colors.iconColor}
      navigateTo="Comments"
      params={{ postId }}
      style={styles.commentsModule}
    >
      <Text
        style={{
          color: commentsCount ? colors.baseTextColor : colors.iconColor,
        }}
      >
        {commentsCount}
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
