import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import avatar from "../assets/images/avatar.jpg";
import { colors } from "../constants/colors";

export const UserAvatar = () => {
  const [userAva, setUserAva] = useState(avatar);

  return (
    <View style={styles.avatar}>
      {userAva && <Image source={avatar} style={styles.avatarImage} />}
      <TouchableOpacity
        onPress={() => setUserAva(!userAva ? avatar : null)}
        style={styles.addAvatar}
      >
        {userAva ? (
          <EvilIcons name="minus" size={30} color={colors.avatarIconDelete} />
        ) : (
          <EvilIcons name="plus" size={30} color={colors.avatarIcon} />
        )}
      </TouchableOpacity>
    </View>
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
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 14,
    right: -15,
  },
});
