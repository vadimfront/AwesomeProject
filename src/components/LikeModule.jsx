import React, { useState } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { colors } from "../constants/colors";
import { StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateLike } from "../redux/operations";
import { selectLikeStatus } from "../redux/selectors/userSelectors";

const LikeModule = ({ likes, postId, userId, likeHandler }) => {
  const { status } = useSelector(selectLikeStatus);
  const dispatch = useDispatch();

  const handleLike = () => {
    if (likes.includes(userId)) {
      const newArrLikes = likes.filter((like) => like !== userId);
      likeHandler({
        likes: newArrLikes,
        postId: postId,
      });
      dispatch(updateLike({ postId, newArrLikes }));
    } else {
      const newArrLikes = [...likes, userId];
      likeHandler({
        likes: newArrLikes,
        postId: postId,
      });
      dispatch(updateLike({ postId, newArrLikes }));
    }
  };

  return (
    <ButtonIcon
      iconName="thumbs-up"
      disabled={status === "loading" ? true : false}
      color={likes.includes(userId) ? colors.activeColor : colors.iconColor}
      onPressHandler={() => handleLike()}
      style={styles.likeModule}
    >
      <Text
        style={{
          color: likes.length ? colors.baseTextColor : colors.iconColor,
        }}
      >
        {likes.length > 0 && likes.length}
      </Text>
    </ButtonIcon>
  );
};

const styles = StyleSheet.create({
  likeModule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default LikeModule;
