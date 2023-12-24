import React, { useState } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { colors } from "../constants/colors";
import { StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateLike } from "../redux/operations";
import { selectLikeStatus } from "../redux/selectors/userSelectors";

const LikeModule = ({ likes, postId, userId }) => {
  const [totalLikes, setTotalLikes] = useState(likes);
  const { status } = useSelector(selectLikeStatus);
  const dispatch = useDispatch();

  const handleLike = () => {
    if (totalLikes.includes(userId)) {
      const newArrLikes = totalLikes.filter((like) => like !== userId);
      setTotalLikes(newArrLikes);
      dispatch(updateLike({ postId, newArrLikes }));
    } else {
      const newArrLikes = [...totalLikes, userId];
      setTotalLikes(newArrLikes);
      dispatch(updateLike({ postId, newArrLikes }));
    }
  };

  return (
    <ButtonIcon
      iconName="thumbs-up"
      disabled={status === "loading" ? true : false}
      color={
        totalLikes.includes(userId) ? colors.activeColor : colors.iconColor
      }
      onPressHandler={() => handleLike()}
      style={styles.likeModule}
    >
      <Text
        style={{
          color: totalLikes.length ? colors.baseTextColor : colors.iconColor,
        }}
      >
        {totalLikes.length > 0 && totalLikes.length}
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
