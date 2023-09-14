import { Formik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";
import { ButtonCustom } from "./ButtonCustom";
import { ButtonIcon } from "./ButtonIcon";
import { InputCustom } from "./InputCustom";

export const PostForm = () => {
  return (
    <Formik
      initialValues={{ image: null, postTitle: "", location: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <View>
            <View style={styles.photo}>
              <View style={styles.photoIcon}>
                <ButtonIcon iconName="camera" color={colors.inputBorder} />
                <InputCustom
                  inputName="image"
                  value={values}
                  handleChange={handleChange}
                  inputMode="text"
                  style={{ display: "none" }}
                />
              </View>
            </View>

            <ButtonCustom
              onPress={() => console.log("Завантажте фото")}
              style={styles.downloadBtnWrap}
              textStyle={styles.downloadBtn}
            >
              Завантажте фото
            </ButtonCustom>
            <View style={styles.inputGroup}>
              <InputCustom
                inputName="postTitle"
                value={values}
                handleChange={handleChange}
                inputMode="text"
                placeholder="Назва..."
                style={styles.input}
              />

              <InputCustom
                inputName="location"
                value={values}
                handleChange={handleChange}
                inputMode="text"
                placeholder="Місцевість"
                style={styles.input}
              />
            </View>

            <ButtonCustom
              onPress={handleSubmit}
              textStyle={{ color: colors.inputPlaceholderColor }}
              style={{
                backgroundColor: colors.createPostDefault,
              }}
            >
              Опубліковати
            </ButtonCustom>
          </View>
          <View style={{ alignItems: "center" }}>
            <ButtonIcon
              iconName="trash-2"
              color={colors.iconColor}
              style={styles.btnTrash}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  photo: {
    height: 240,
    backgroundColor: colors.createPostDefault,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  downloadBtnWrap: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },
  downloadBtn: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 8,
    backgroundColor: "transparent",
    textAlign: "left",
    color: colors.inputPlaceholderColor,
  },
  inputGroup: {
    marginVertical: 32,
    gap: 16,
  },
  input: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    paddingHorizontal: 0,
  },
  btnTrash: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.createPostDefault,
    borderRadius: 20,
  },
});
