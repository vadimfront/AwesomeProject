import React, { useState } from "react";
import { ButtonIcon } from "./ButtonIcon";
import { colors } from "../constants/colors";
import { StyleSheet, Text } from "react-native";

const LikeModule = ({ postLikes = 0 }) => {
  const [likeCounter, setLikeCounter] = useState(postLikes);
  return (
    <ButtonIcon
      iconName="thumbs-up"
      color={likeCounter ? colors.activeColor : colors.iconColor}
      onPressHandler={() => setLikeCounter(likeCounter + 1)}
      style={styles.likeModule}
    >
      <Text
        style={{
          color: likeCounter ? colors.baseTextColor : colors.iconColor,
        }}
      >
        {likeCounter}
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
