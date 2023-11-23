import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const coords = route.params;
  console.log(coords);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{ ...coords, latitudeDelta: 0.03, longitudeDelta: 0.03 }}
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
    width: "100%",
    height: "100%",
  },
});
