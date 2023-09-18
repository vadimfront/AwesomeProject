import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import avatar from "../assets/images/avatar.jpg";
import { colors } from "../constants/colors";

const UserProfile = () => {
  return (
    <View style={styles.profileWrapper}>
      <Image source={avatar} style={styles.avatar} />
      <View>
        <Text style={styles.userName}>Natali Romanova</Text>
        <Text style={styles.userEmail}>email@example.com</Text>
      </View>
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
