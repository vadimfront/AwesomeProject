import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { ButtonCustom } from "./ButtonCustom";
import { ButtonIcon } from "./ButtonIcon";
import { InputCustom } from "./InputCustom";
import { CameraComponent } from "./CameraComponent";
import { useLocation } from "../hooks/useLocation";
import { UploadImage } from "./UploadImage";
import { useNavigation } from "@react-navigation/native";

export const PostForm = () => {
  const { setCurrentPlace, loading } = useLocation();
  const [image, setImage] = useState(null);
  const formikRef = useRef(null);
  const navigation = useNavigation();

  const setImageFunc = (img) => {
    setImage(img);
    formikRef.current.setFieldValue("image", img);
  };

  const autoLocationHandler = async () => {
    const locationName = await setCurrentPlace();
    formikRef.current.setFieldValue("location", locationName);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.photo}>
        <CameraComponent setImageFunc={setImageFunc} image={image} />
      </View>
      <UploadImage setImageFunc={setImageFunc} image={image} />
      <Formik
        initialValues={{ image: null, postTitle: "", location: "" }}
        innerRef={formikRef}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
          setImage(null);
          navigation.navigate("PostsScreen");
        }}
      >
        {({ handleChange, handleSubmit, values, resetForm, setFieldValue }) => (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            {loading && <Text>Loading...</Text>}
            <View>
              <InputCustom
                inputName="image"
                value={values}
                handleChange={handleChange}
                inputMode="text"
                style={{ display: "none" }}
              />
              <View style={styles.inputGroup}>
                <InputCustom
                  inputName="postTitle"
                  value={values}
                  handleChange={handleChange}
                  inputMode="text"
                  placeholder="Назва..."
                  style={styles.input}
                />

                <View style={{ position: "relative" }}>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      right: 0,
                      width: 20,
                      height: 20,
                      backgroundColor: "red",
                      zIndex: 99,
                    }}
                    onPress={() => autoLocationHandler(setFieldValue)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                  <InputCustom
                    inputName="location"
                    value={values}
                    handleChange={handleChange}
                    inputMode="text"
                    placeholder="Місцевість"
                    style={styles.input}
                  />
                </View>
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
                onPressHandler={() => {
                  resetForm();
                  setImage(null);
                }}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  photo: {
    backgroundColor: "#000",
    borderRadius: 8,
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
