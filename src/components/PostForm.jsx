import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { colors } from "../constants/colors";
import { ButtonCustom } from "./ButtonCustom";
import { ButtonIcon } from "./ButtonIcon";
import { InputCustom } from "./InputCustom";
import { CameraComponent } from "./CameraComponent";
import { useLocation } from "../hooks/useLocation";
import { UploadImage } from "./UploadImage";
import { useNavigation } from "@react-navigation/native";

const СreatePostSchema = Yup.object().shape({
  image: Yup.string().required("Ви не обрали зображення"),
  postTitle: Yup.string().required("Потрібно ввести заголовок"),
  location: Yup.string().required("Потрібно встановити локацію"),
});

export const PostForm = () => {
  const [isCoordsError, setIsCoordsError] = useState(false);
  const { getCurrentPlace, getLocationFromAddress, loading } = useLocation();
  const [image, setImage] = useState(null);
  const formikRef = useRef(null);
  const navigation = useNavigation();

  const setSelectedImage = (img) => {
    setImage(img);
    formikRef.current.setFieldValue("image", img);
  };

  const autoLocationHandler = async () => {
    const locationName = await getCurrentPlace();
    formikRef.current.setFieldValue("location", locationName);
  };

  const resetFormHandler = (resetForm) => {
    resetForm();
    setImage(null);
  };

  return (
    <View style={styles.defaultFlex}>
      <View style={styles.photo}>
        <CameraComponent setSelectedImage={setSelectedImage} image={image} />
      </View>
      <UploadImage setSelectedImage={setSelectedImage} image={image} />
      <Formik
        initialValues={{ image: null, postTitle: "", location: "" }}
        innerRef={formikRef}
        validationSchema={СreatePostSchema}
        validateOnMount={true}
        onSubmit={async (values, { resetForm }) => {
          const coords = await getLocationFromAddress(
            values.location.toString()
          );
          if (!coords) {
            setIsCoordsError(true);
            return;
          }

          const newData = {
            ...values,
            coords: coords,
          };

          console.log(newData);

          resetFormHandler(resetForm);
          navigation.navigate("PostsScreen");
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          resetForm,
          setFieldValue,
          errors,
          touched,

          isValid,
        }) => (
          <View style={styles.formContainer}>
            <View>
              <InputCustom
                inputName="image"
                value={values}
                handleChange={handleChange}
                inputMode="text"
                style={styles.hide}
              />
              {errors.image && touched.image ? (
                <Text style={styles.error}>{errors.image}</Text>
              ) : null}

              <View style={styles.inputGroup}>
                <InputCustom
                  inputName="postTitle"
                  value={values}
                  handleChange={handleChange}
                  inputMode="text"
                  placeholder="Назва..."
                  style={styles.input}
                />
                {errors.postTitle && touched.postTitle ? (
                  <Text style={styles.error}>{errors.postTitle}</Text>
                ) : null}
                <View style={styles.inputGroup}>
                  <View style={styles.locationWrapper}>
                    <InputCustom
                      inputName="location"
                      value={values}
                      handleChange={handleChange}
                      inputMode="text"
                      placeholder="Місцевість"
                      style={{ ...styles.input, ...styles.locationInput }}
                    />
                    {!loading && (
                      <ButtonIcon
                        iconName="map-pin"
                        onPressHandler={() =>
                          autoLocationHandler(setFieldValue)
                        }
                        style={styles.btnLocationIcon}
                        color={colors.inputPlaceholderColor}
                      />
                    )}
                    {loading && (
                      <ActivityIndicator
                        size="large"
                        color="#000"
                        style={{ position: "absolute" }}
                      />
                    )}
                  </View>
                  {errors.location && touched.location ? (
                    <Text style={styles.error}>{errors.location}</Text>
                  ) : null}
                  {isCoordsError && (
                    <Text style={styles.error}>
                      Помилка визначення локації. Можливо адреса не вірна
                    </Text>
                  )}
                </View>
                {/* <TouchableOpacity
                  onPress={() => autoLocationHandler(setFieldValue)}
                >
                  <Text>Встановити локацію автоматично</Text>
                </TouchableOpacity> */}
              </View>

              <ButtonCustom
                onPress={handleSubmit}
                textStyle={{
                  color: isValid ? "#fff" : colors.inputPlaceholderColor,
                }}
                style={{
                  backgroundColor: isValid
                    ? colors.btnBgColor
                    : colors.createPostDefault,
                }}
                disabled={!isValid}
              >
                Опубліковати
              </ButtonCustom>
            </View>
            <View style={styles.trashBtnContainer}>
              <ButtonIcon
                iconName="trash-2"
                color={colors.iconColor}
                style={styles.btnTrash}
                onPressHandler={() => {
                  resetFormHandler(resetForm);
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
  error: {
    color: "red",
  },
  hide: {
    display: "none",
  },
  defaultFlex: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
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
    paddingVertical: 32,
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
  locationWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  locationInput: {
    paddingLeft: 35,
  },
  btnLocationIcon: {
    position: "absolute",
  },
  trashBtnContainer: {
    marginTop: 20,
    alignItems: "center",
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
