import React from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const ButtonNavigationIcon = ({
  iconName,
  size = 24,
  color = "#000",
  navigateTo,
  children,
  params,
  ...props
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo, { ...params })}
      {...props}
    >
      <Feather name={iconName} size={size} color={color} />
      {children}
    </TouchableOpacity>
  );
};
