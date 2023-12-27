import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { fontSizes } from "../constants/fontSizes";

import { avatarPlaceholder } from "../constants/constants";
import { selectAuth, selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateProfileImage } from "../redux/operations";
import { LoadingSpinner } from "./LoadingSpinner";

export const UserAvatar = ({ pickImage, pickedImage, removePickedImage }) => {
  const { profile, loading, auth, error } = useSelector(selectAuth);
  const { ownPosts } = useSelector(selectPosts);

  const dispatch = useDispatch();

  const {
    userProfileImage: { type, url },
  } = profile;

  useEffect(() => {
    if (auth && type === "default" && pickedImage) {
      const updatedData = {
        collectionName: "users",
        userProfileImage: { type: "own", url: pickedImage },
        userId: auth,
        hasPosts: ownPosts.length ? true : false,
      };
      dispatch(updateProfileImage(updatedData));
    }
  }, [pickedImage]);

  const removeProfileImage = () => {
    if (auth) {
      const updatedData = {
        collectionName: "users",
        userId: auth,
        userProfileImage: { type: "default", url: avatarPlaceholder },
        hasPosts: ownPosts.length ? true : false,
      };
      dispatch(updateProfileImage(updatedData));
    }
    removePickedImage();
  };

  const imageSrc = url ? url : pickedImage;

  return (
    <>
      <View style={styles.avatar}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage }} style={styles.avatarImage} />
        ) : (
          <Image
            src={imageSrc || avatarPlaceholder}
            style={styles.avatarImage}
          />
        )}
        <View style={styles.addAvatar}>
          {type === "default" && !pickedImage ? (
            <TouchableOpacity onPress={pickImage}>
              <EvilIcons name="plus" size={30} color={colors.avatarIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={removeProfileImage}>
              <EvilIcons
                name="minus"
                size={30}
                color={colors.avatarIconDelete}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.userName}></Text>
      </View>
      <LoadingSpinner
        loading={loading}
        overlayColor={colors.btnBgColor}
        text="Загрузка..."
      />
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
    marginTop: -60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 14,
    right: -15,
  },
  userName: {
    fontSize: fontSizes.titleFirstLevel,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    textAlign: "center",
    marginVertical: 32,
  },
});
