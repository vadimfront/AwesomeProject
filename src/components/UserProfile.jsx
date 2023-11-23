import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/selectors/userSelectors";

const UserProfile = () => {
  const { profile, error, errorMessage } = useSelector(selectAuth);

  return (
    <View style={styles.profileWrapper}>
      {error && <Text>{errorMessage}</Text>}
      {profile && (
        <>
          <Image src={profile.userProfileImage.url} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{profile.userName}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileWrapper: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontSize: 13,
    color: colors.title,
    fontFamily: "Roboto-Bold",
  },
  userEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.80)",
    fontFamily: "Roboto-Regular",
  },
});

export default UserProfile;
