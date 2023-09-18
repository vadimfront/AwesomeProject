import React from "react";
import bg from "../assets/images/RegistrationScreenBg.jpg";
import { ImageBackground, Text, StyleSheet, View } from "react-native";
import { UserAvatar } from "../components/UserAvatar";
import Posts from "../components/Posts";
import { ButtonNavigationIcon } from "../components/ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { postData } from "../constants/temporary";
import { fontSizes } from "../constants/fontSizes";

export const ProfileScreen = () => {
  return (
    <ImageBackground style={styles.image} source={bg}>
      <View style={styles.container}>
        <View style={styles.logOut}>
          <ButtonNavigationIcon
            iconName="log-out"
            color={colors.iconColor}
            navigateTo="Registration"
          />
        </View>
        <UserAvatar />
        <Text style={styles.userName}>Natali Romanova</Text>
        <Posts postData={postData} />
      </View>
    </ImageBackground>
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
