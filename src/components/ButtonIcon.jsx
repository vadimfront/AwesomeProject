import React from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export const ButtonIcon = ({
  iconName,
  size = 24,
  color = "#000",
  onPressHandler,
  disabled,
  children,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPressHandler} {...props} disabled={disabled}>
      <Feather name={iconName} size={size} color={color} />
      {children}
    </TouchableOpacity>
  );
};
