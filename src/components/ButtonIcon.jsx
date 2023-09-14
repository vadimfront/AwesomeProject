import React from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ButtonIcon = ({
  iconName,
  size = 24,
  color = "#000",
  onPressHandler,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPressHandler} {...props}>
      <Feather name={iconName} size={size} color={color} />
      {children}
    </TouchableOpacity>
  );
};
