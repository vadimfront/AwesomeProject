import React, { useEffect, useRef } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { UserAvatar } from "./UserAvatar";
import { ButtonCustom } from "./ButtonCustom";
import { InputPassword } from "./InputPassword";
import { InputCustom } from "./InputCustom";
import { signUp } from "../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { usePickImage } from "../hooks/usePickImage";
import { toastMessage } from "../helpers/toastMessage";
import * as Yup from "yup";
import { selectAuth } from "../redux/selectors/userSelectors";
import { LoadingSpinner } from "./LoadingSpinner";
import { fontSizes } from "../constants/fontSizes";

export const RegistrationForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formikRef = useRef(null);

  const { auth, loading, error, errorMessage } = useSelector(selectAuth);
  const { pickImage, pickedImage, removePickedImage } = usePickImage();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
        removePickedImage();
      };
    }, [])
  );

  const handleSignUp = ({ email, password, login }) => {
    const data = {
      email: email,
      password: password,
      userProfileImage: pickedImage,
      userName: login,
    };

    console.log(data);
    dispatch(signUp(data));
  };

  useEffect(() => {
    if (auth) navigation.navigate("Home");
  }, [auth]);

  useEffect(() => {
    if (error) {
      switch (errorMessage) {
        case "auth/email-already-in-use":
          toastMessage("error", "Opps...", "Email already in use");
          break;
        default:
          break;
      }
    }
    if (auth) formikRef.current.resetForm();
  }, [errorMessage]);

  const createRigistrationSchema = Yup.object().shape({
    login: Yup.string()
      .test(
        "is-string",
        "Поле должно быть строкой",
        (value) => typeof value === "string"
      )
      .required("Це поле обов'язкове"),
    email: Yup.string()
      .email("Неправильно введено Email")
      .required("Це поле обов'язкове"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Поле повинно містити як букви, так і цифри латинського алфавіту"
      )
      .required("Це поле обов'язкове"),
  });

  return (
    <>
      <View style={styles.form}>
        <UserAvatar
          pickedImage={pickedImage}
          pickImage={pickImage}
          removePickedImage={removePickedImage}
        />
        <Text style={styles.title}>Реєстрація</Text>
        <View style={styles.container}>
          <Formik
            innerRef={(ref) => (formikRef.current = ref)}
            initialValues={{ login: "", email: "", password: "" }}
            validationSchema={createRigistrationSchema}
            onSubmit={(value) => {
              handleSignUp({ ...value });
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.fromContent}>
                <View>
                  <InputCustom
                    inputName="login"
                    inputMode="text"
                    value={values}
                    handleChange={handleChange}
                    placeholder="Логін"
                  />
                  {errors.login && touched.login ? (
                    <Text style={styles.error}>{errors.login}</Text>
                  ) : null}
                </View>
                <View>
                  <InputCustom
                    inputName="email"
                    autoCapitalize="none"
                    inputMode="email"
                    value={values}
                    handleChange={handleChange}
                    placeholder="Адреса електронної пошти"
                  />
                  {errors.email && touched.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : null}
                </View>
                <View>
                  <InputPassword
                    inputName="password"
                    autoCapitalize="none"
                    handleChange={handleChange}
                    value={values}
                    placeholder="Пароль"
                  />
                  {errors.password && touched.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : null}
                </View>
                <ButtonCustom onPress={handleSubmit}>
                  Зареєстуватися
                </ButtonCustom>
              </View>
            )}
          </Formik>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkSignup}>Вже є акаунт? Увійти</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LoadingSpinner
        loading={loading}
        overlayColor={colors.btnBgColor}
        text="Загрузка..."
      />
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  form: {
    marginBottom: 0,
    backgroundColor: colors.formBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 78,
  },
  title: {
    marginVertical: 32,
    fontSize: fontSizes.titleFirstLevel,
    textAlign: "center",
    color: colors.baseTextColor,
    fontFamily: "Roboto-Medium",
  },
  fromContent: {
    gap: 16,
  },
  linkSignup: {
    fontSize: fontSizes.defaultText,
    marginTop: 16,
    textAlign: "center",
    color: colors.linkColor,
  },
});
