import React from "react";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { TextInput, View, Button } from "react-native";
import { ButtonIcon } from "./ButtonIcon";
import { colors } from "../constants/colors";
import { Keyboard } from "react-native";

export const CommentForm = ({ handlerFocus }) => {
  return (
    <Formik
      initialValues={{ comment: "" }}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        Keyboard.dismiss();
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.commentForm}>
          <View style={styles.groupWrap}>
            <TextInput
              onChangeText={handleChange("comment")}
              onBlur={() => handlerFocus(false)}
              value={values.comment}
              style={styles.inputComment}
              placeholder="Коментувати..."
              onFocus={() => handlerFocus(true)}
            />

            <ButtonIcon
              onPressHandler={handleSubmit}
              iconName="arrow-up"
              style={styles.btnComment}
              color="#fff"
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  commentForm: {
    paddingVertical: 16,
  },
  groupWrap: {
    position: "relative",
    justifyContent: "center",
  },
  inputComment: {
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 100,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 52,
  },
  btnComment: {
    width: 34,
    height: 34,
    position: "absolute",
    right: 8,
    backgroundColor: colors.btnBgColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
