import Toast from "react-native-toast-message";

export const toastMessage = (type, firstMessage = "", secondMessage = "") => {
  Toast.show({
    type: type,
    text1: firstMessage,
    text2: secondMessage,
  });
};
