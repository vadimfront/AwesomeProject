import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

export const usePickImage = () => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [errorImageMessage, setErrorImageMessage] = useState("");
  const [pickedImage, setPickedImage] = useState(null);

  const pickImage = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setErrorImageMessage(
        "You have not allowed the application to access the gallery"
      );
      return;
    }
    setIsImageLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;

        const manipResult = await manipulateAsync(uri, [], {
          compress: 0.3,
          format: SaveFormat.JPEG,
        });

        setPickedImage(manipResult.uri);
        setErrorImageMessage("");
      }
    } catch (error) {
      setErrorImageMessage("Opps! Error...");
    } finally {
      setIsImageLoading(false);
    }
  };

  const removePickedImage = () => {
    setPickedImage(null);
  };

  return {
    pickImage,
    removePickedImage,
    pickedImage,
    isImageLoading,
    errorImageMessage,
  };
};
