import React from "react";
import { ButtonCustom } from "./ButtonCustom";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { usePickImage } from "../hooks/usePickImage";

export const UploadImage = ({ setSelectedImage, image }) => {
  const { pickImage, pickedImage, isImageLoading, errorImage } = usePickImage();

  const uploadImageHandler = async () => {
    await pickImage();
    setSelectedImage(pickedImage);
  };

  return (
    <View>
      <ButtonCustom
        onPress={uploadImageHandler}
        style={styles.downloadBtnWrap}
        textStyle={styles.downloadBtn}
      >
        {!image ? "Завантажте фото" : "Редагувати фото"}
      </ButtonCustom>
      {isImageLoading && <Text>Loading...</Text>}
      {errorImage && <Text>{errorImage}</Text>}
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
