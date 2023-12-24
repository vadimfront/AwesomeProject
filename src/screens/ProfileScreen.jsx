import React, { useEffect } from "react";
import bg from "../assets/images/RegistrationScreenBg.jpg";
import { ImageBackground, Text, StyleSheet, View } from "react-native";
import { UserAvatar } from "../components/UserAvatar";
import Posts from "../components/Posts";
import { ButtonNavigationIcon } from "../components/ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { fontSizes } from "../constants/fontSizes";
import { selectAuth, selectPosts } from "../redux/selectors/userSelectors";
import { useDispatch, useSelector } from "react-redux";
import { usePickImage } from "../hooks/usePickImage";
import { fatchMorePosts, fatchPosts } from "../redux/operations";
import { cleanPosts } from "../redux/slices/postSlice";

export const ProfileScreen = () => {
  const { profile, auth } = useSelector(selectAuth);
  const { ownPosts, lastVisible, isLastPost, loading } =
    useSelector(selectPosts);
  const { pickImage, pickedImage, removePickedImage } = usePickImage();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("profile");
    dispatch(cleanPosts());
    dispatch(
      fatchPosts({
        collectionName: "posts",
        type: "own",
        fieldName: "author.id",
        equalToFieldName: auth,
      })
    );
  }, [profile]);

  const fetchMoreHandler = () => {
    if (!loading && !isLastPost) {
      dispatch(
        fatchMorePosts({
          collectionName: "posts",
          type: "own",
          fieldName: "author.id",
          equalToFieldName: auth,
          lastVisible: lastVisible,
        })
      );
    }
  };

  return (
    <>
      <ImageBackground style={styles.image} source={bg}>
        <View style={styles.container}>
          <View style={styles.logOut}>
            <ButtonNavigationIcon
              type="logOut"
              iconName="log-out"
              color={colors.iconColor}
              navigateTo="Registration"
            />
          </View>
          <UserAvatar
            pickedImage={pickedImage}
            pickImage={pickImage}
            removePickedImage={removePickedImage}
          />
          {profile && <Text style={styles.userName}>{profile.userName}</Text>}
          <Posts
            posts={ownPosts}
            loading={loading}
            fetchMore={fetchMoreHandler}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.formBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
  },
  logOut: {
    position: "absolute",
    top: 22,
    right: 19,
  },
  image: {
    flex: 1,
    paddingTop: 179,
  },
  userName: {
    fontSize: fontSizes.titleFirstLevel,
    fontFamily: "Roboto-Medium",
    letterSpacing: 0.3,
    textAlign: "center",
    marginVertical: 32,
  },
});
