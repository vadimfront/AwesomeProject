import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { InputCustom } from "./InputCustom";

export const InputPassword = ({
  handleChange,
  values,
  inputName,
  ...props
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const switchPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <View style={styles.inputPasswordWrapper}>
      <InputCustom
        autoCapitalize="none"
        inputMode="text"
        placeholder="Пароль"
        inputName={inputName}
        values={values[inputName]}
        handleChange={handleChange}
        secureTextEntry={isPasswordShown}
        {...props}
      />
      <TouchableOpacity style={styles.togglerPassword} onPress={switchPassword}>
        {isPasswordShown ? (
          <Text style={styles.togglerPasswordText}>Показати</Text>
        ) : (
          <Text style={styles.togglerPasswordText}>Приховати</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputPasswordWrapper: {
    position: "relative",
  },
  togglerPassword: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    right: 16,
  },
  togglerPasswordText: {
    color: colors.linkColor,
  },
});
