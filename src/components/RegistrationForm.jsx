import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { fontSizes } from "../constants/FontSizes";
import { UserAvatar } from "./UserAvatar";
import { ButtonCustom } from "./ButtonCustom";
import { InputPassword } from "./InputPassword";
import { InputCustom } from "./InputCustom";

export const RegistrationForm = () => {
  return (
    <View style={styles.form}>
      <UserAvatar />
      <Text style={styles.title}>Реєстрація</Text>
      <View style={styles.container}>
        <Formik
          initialValues={{ login: "", email: "", password: "" }}
          onSubmit={(value) => console.log(value)}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.fromContent}>
              <InputPassword
                inputName="login"
                inputMode="text"
                values={values}
                handleChange={handleChange}
                placeholder="Логін"
              />
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
              <ButtonCustom onPress={handleSubmit}>Зареєстуватися</ButtonCustom>
            </View>
          )}
        </Formik>
        <Text style={styles.linkSignup}>Вже є акаунт? Увійти</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: colors.title,
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
