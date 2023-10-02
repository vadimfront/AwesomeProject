import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ButtonCustom } from "./ButtonCustom";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export const UploadImage = ({ setSelectedImage, image }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setError("You have not allowed the application to access the gallery");
      return;
    }
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        setError("");
      }
    } catch (error) {
      setError("Opps! Error...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <ButtonCustom
        onPress={pickImage}
        style={styles.downloadBtnWrap}
        textStyle={styles.downloadBtn}
      >
        {!image ? "Завантажте фото" : "Редагувати фото"}
      </ButtonCustom>
      {loading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  downloadBtnWrap: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "transparent",
    marginTop: 8,
  },
  downloadBtn: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 8,
    backgroundColor: "transparent",
    textAlign: "left",
    color: colors.inputPlaceholderColor,
  },
});
