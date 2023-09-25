import React, { useEffect } from "react";
import { ButtonNavigationIcon } from "./ButtonNavigationIcon";
import { colors } from "../constants/colors";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

const LocationModule = ({ locationData }) => {
  return (
    <ButtonNavigationIcon
      iconName="map-pin"
      color={colors.iconColor}
      style={styles.locationModule}
      navigateTo="Map"
      params={locationData}
    >
      <Text style={styles.locationName}>{locationData.locationName}</Text>
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
