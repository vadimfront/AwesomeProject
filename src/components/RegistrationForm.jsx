import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { fontSizes } from "../constants/fontSizes";
import { UserAvatar } from "./UserAvatar";
import { ButtonCustom } from "./ButtonCustom";
import { InputPassword } from "./InputPassword";
import { InputCustom } from "./InputCustom";

export const RegistrationForm = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.form}>
      <UserAvatar />
      <Text style={styles.title}>Реєстрація</Text>
      <View style={styles.container}>
        <Formik
          initialValues={{ login: "", email: "", password: "" }}
          onSubmit={(value) => {
            console.log(value);
            navigation.navigate("Home");
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.fromContent}>
              <InputCustom
                inputName="login"
                inputMode="text"
                value={values}
                handleChange={handleChange}
                placeholder="Логін"
              />
              <InputCustom
                inputName="email"
                autoCapitalize="none"
                inputMode="email"
                value={values}
                handleChange={handleChange}
                placeholder="Адреса електронної пошти"
              />
              <InputPassword
                inputName="password"
                handleChange={handleChange}
                value={values}
                placeholder="Пароль"
              />
              <ButtonCustom onPress={handleSubmit}>Зареєстуватися</ButtonCustom>
            </View>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkSignup}>Вже є акаунт? Увійти</Text>
        </TouchableOpacity>
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
