import React, { useCallback } from "react";
import * as Yup from "yup";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { fontSizes } from "../constants/fontSizes";
import { InputCustom } from "./InputCustom";
import { InputPassword } from "./InputPassword";
import { ButtonCustom } from "./ButtonCustom";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/operations";
import { selectAuth } from "../redux/selectors/userSelectors";
import { useEffect } from "react";
import { toastMessage } from "../helpers/toastMessage";
import { useRef } from "react";
import { resetError } from "../redux/slices/usersSlice";
import { LoadingSpinner } from "./LoadingSpinner";

export const LoginForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formikRef = useRef(null);

  const { auth, loading, error, errorMessage } = useSelector(selectAuth);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (formikRef.current) {
          formikRef.current.resetForm();
          dispatch(resetError());
        }
      };
    }, [])
  );

  const handleLogin = ({ email, password }) => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (auth) navigation.navigate("Home");
  }, [auth]);

  useEffect(() => {
    if (error) {
      switch (errorMessage) {
        case "auth/invalid-login-credentials":
          toastMessage("error", "Opps...", "Не верный Email или пароль");
          break;
        case "auth/too-many-requests":
          toastMessage(
            "error",
            "Opps...",
            "Ви зробили надто багато запитів, спробуйте через пару хвилин"
          );
        default:
          break;
      }
    }
    if (auth) formikRef.current.resetForm();
  }, [loading, error, errorMessage]);

  const createLoginSchema = Yup.object().shape({
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
        <Text style={styles.title}>Увійти</Text>
        <View>
          <Formik
            innerRef={(ref) => (formikRef.current = ref)}
            initialValues={{ email: "", password: "" }}
            validationSchema={createLoginSchema}
            onSubmit={(value) => {
              handleLogin({ ...value });
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.fromContent}>
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
                <ButtonCustom onPress={handleSubmit}>Увійти</ButtonCustom>
              </View>
            )}
          </Formik>
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Text style={styles.linkRegister}>
              Немає акаунту? Зареєструватися
            </Text>
          </TouchableOpacity>
        </View>
        <LoadingSpinner
          loading={loading}
          overlayColor={colors.btnBgColor}
          text="Загрузка..."
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
  form: {
    backgroundColor: colors.formBg,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingBottom: 132,
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
  linkRegister: {
    fontSize: fontSizes.defaultText,
    marginTop: 16,
    textAlign: "center",
    color: colors.linkColor,
  },
});
