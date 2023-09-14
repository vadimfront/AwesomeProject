import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { View, Text, TouchableOpacity, Button, Image } from "react-native";
import { ButtonIcon } from "./ButtonIcon";

export const CameraComponent = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
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

        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        setImage(null);
      } catch (error) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!image ? (
        <Camera
          type={type}
          flashMode={flash}
          ref={cameraRef}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
              paddingVertical: 30,
            }}
          >
            <ButtonIcon
              iconName="repeat"
              color="#fff"
              onPressHandler={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <ButtonIcon
              iconName="zap"
              color="#fff"
              onPressHandler={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={{ flex: 1 }} />
      )}
      {image ? (
        <View>
          <ButtonIcon
            iconName="x-circle"
            onPressHandler={() => setImage(null)}
          />
          <ButtonIcon iconName="save" onPressHandler={saveImage} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={takePicture}
          style={{ position: "absolute", zIndex: 999 }}
        >
          <Text style={{ color: "#fff" }}>Take photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
