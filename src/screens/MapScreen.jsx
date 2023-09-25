import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { coords } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coords,
        }}
        showsUserLocation={true}
      >
        {coords && (
          <Marker title="I am here" coordinate={coords} description="Hello" />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
