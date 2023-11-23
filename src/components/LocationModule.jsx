import React from "react";
import { ButtonNavigationIcon } from "./ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const LocationModule = ({ location }) => {
  const { address, coords } = location;
  return (
    <ButtonNavigationIcon
      iconName="map-pin"
      color={colors.iconColor}
      style={styles.locationModule}
      navigateTo="Map"
      params={coords}
    >
      <Text style={styles.locationName}>{address}</Text>
    </ButtonNavigationIcon>
  );
};

const styles = StyleSheet.create({
  locationModule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationName: {
    textDecorationLine: "underline",
    color: colors.baseTextColor,
  },
});

export default LocationModule;
