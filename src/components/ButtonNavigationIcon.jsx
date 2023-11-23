import React from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/usersSlice";

export const ButtonNavigationIcon = ({
  iconName,
  size = 24,
  color = "#000",
  navigateTo,
  children,
  params,
  type,
  ...props
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPressButtonHandler = () => {
    if (type === "logOut") {
      dispatch(logOut());
    }
    navigation.navigate(navigateTo, { ...params });
  };

  return (
    <TouchableOpacity onPress={() => onPressButtonHandler()} {...props}>
      <Feather name={iconName} size={size} color={color} />
      {children}
    </TouchableOpacity>
  );
};
