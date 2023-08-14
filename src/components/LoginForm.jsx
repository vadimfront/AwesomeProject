import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { fontSizes } from "../constants/FontSizes";
import { InputCustom } from "./InputCustom";
import { InputPassword } from "./InputPassword";
import { ButtonCustom } from "./ButtonCustom";

export const LoginForm = () => {
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Увійти</Text>
      <View style={styles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(value) => console.log(value)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.fromContent}>
              <InputCustom
                inputName="email"
                autoCapitalize="none"
                inputMode="email"
                values={values}
                handleChange={handleChange}
                placeholder="Адреса електронної пошти"
              />
              <InputPassword
                inputName="password"
                handleChange={handleChange}
                values={values}
                placeholder="Пароль"
              />
              <ButtonCustom onPress={handleSubmit}>Увійти</ButtonCustom>
            </View>
          )}
        </Formik>
        <Text style={styles.linkRegister}>Немає акаунту? Зареєструватися</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
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
    color: colors.title,
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
