import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { Formik } from "formik";
import { fontSizes } from "../constants/fontSizes";
import { InputCustom } from "./InputCustom";
import { InputPassword } from "./InputPassword";
import { ButtonCustom } from "./ButtonCustom";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Увійти</Text>
      <View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(value) => {
            console.log(value);
            navigation.navigate("Home");
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.fromContent}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
