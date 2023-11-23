import React, { useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../constants/colors";
import { ButtonCustom } from "./ButtonCustom";
import { ButtonIcon } from "./ButtonIcon";
import { InputCustom } from "./InputCustom";
import { CameraComponent } from "./CameraComponent";
import { useLocation } from "../hooks/useLocation";
import { UploadImage } from "./UploadImage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../redux/operations";
import { selectAuth } from "../redux/selectors/userSelectors";
import { getCurrentDateAndTime } from "../helpers/helpers";

const СreatePostSchema = Yup.object().shape({
  image: Yup.string().required("Ви не обрали зображення"),
  postTitle: Yup.string().required("Потрібно ввести заголовок"),
  location: Yup.string(),
});

export const PostForm = () => {
  const { getLocationFromAddress, coordsLoading } = useLocation();
  const [image, setImage] = useState(null);

  const { profile, auth } = useSelector(selectAuth);

  const formikRef = useRef(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const setSelectedImage = (img) => {
    setImage(img);
    formikRef.current.setFieldValue("image", img);
  };

  const resetFormHandler = (resetForm) => {
    resetForm();
    setImage(null);
  };

  const handleCreatePost = async (data) => {
    const { image, postTitle, location } = data;

    const coords = await getLocationFromAddress(location);

    const postDate = {
      postImage: image,
      postTitle: postTitle,
      location: {
        address: location,
        coords: coords,
      },
      author: {
        id: auth,
        name: profile.userName,
        photo: profile.userProfileImage.url,
      },
      date: getCurrentDateAndTime(),
    };

    dispatch(createPost(postDate));
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
          handleCreatePost(values);
          navigation.navigate("PostsScreen");
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          resetForm,
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

                    <Feather
                      name="map-pin"
                      style={styles.locationIcon}
                      color={colors.inputPlaceholderColor}
                      size={20}
                    />
                  </View>
                  {errors.location && touched.location ? (
                    <Text style={styles.error}>{errors.location}</Text>
                  ) : null}
                </View>
              </View>

              <View style={styles.btnSubmitWrapper}>
                <ButtonCustom
                  onPress={handleSubmit}
                  textStyle={{
                    color:
                      isValid && !coordsLoading
                        ? "#fff"
                        : colors.inputPlaceholderColor,
                  }}
                  style={{
                    backgroundColor:
                      isValid && !coordsLoading
                        ? colors.btnBgColor
                        : colors.createPostDefault,
                  }}
                  disabled={!isValid || coordsLoading}
                >
                  Опубліковати
                </ButtonCustom>
              </View>
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
    paddingLeft: 25,
  },
  locationIcon: {
    position: "absolute",
  },
  trashBtnContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  btnSubmitWrapper: {
    position: "relative",
  },
  btnTrash: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.createPostDefault,
    borderRadius: 20,
  },
  spinner: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -40,
  },
});
