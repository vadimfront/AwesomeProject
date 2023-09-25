import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { ButtonIcon } from "./ButtonIcon";
import { colors } from "../constants/colors";

export const CameraComponent = ({ setImageFunc, image }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isIconShown, setIsIconShown] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({ quality: 0.3 });
        setImageFunc(data.uri);
        setIsIconShown(true);
      } catch (error) {}
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);

        setIsIconShown(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeImage = () => {
    setIsIconShown(false);
    setImageFunc(null);
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log(image);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      {!image && (
        <Camera
          type={type}
          flashMode={flash}
          ref={cameraRef}
          aspectRatio={1 / 1}
          style={{
            height: 240,
          }}
        />
      )}
      {image && (
        <Image
          source={{ uri: image }}
          style={{ flex: 1, width: "100%", height: 240, resizeMode: "contain" }}
        />
      )}

      <View
        style={[
          styles.iconTopOptions,
          !isIconShown && image && { display: "none" },
        ]}
      >
        <ButtonIcon
          iconName="repeat"
          color={type === CameraType.front ? colors.activeColor : "#fff"}
          onPressHandler={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        />
        <ButtonIcon
          iconName="zap"
          color={
            flash === Camera.Constants.FlashMode.on
              ? colors.activeColor
              : "#fff"
          }
          onPressHandler={() => {
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off
            );
          }}
        />
      </View>
      <View style={styles.takePhotoWrapper}>
        <View style={styles.photoOptionsWrapper}>
          {image && (
            <ButtonIcon
              iconName="x-circle"
              onPressHandler={() => removeImage(null)}
              color="#fff"
              style={styles.photoIcon}
            />
          )}
          {image && isIconShown && (
            <ButtonIcon
              color="#fff"
              iconName="save"
              onPressHandler={saveImage}
              style={[styles.photoIcon, !isIconShown && { display: "none" }]}
            />
          )}
        </View>

        {!image && (
          <ButtonIcon
            iconName="camera"
            color={colors.inputBorder}
            onPress={takePicture}
            style={styles.photoIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconTopOptions: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  takePhotoWrapper: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 98,
  },
  photoOptionsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    gap: 15,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
