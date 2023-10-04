import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [markerLocation, setMarkerLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
        }
      } catch (error) {
        console.error(
          "An error occurred while requesting location permissions:",
          error
        );
      }
    })();
  }, []);

  const getCoords = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      return coords;
    } catch (error) {
      setError("Error fetching location data");
    }
  };

  const getLocationFromAddress = async (address) => {
    try {
      setLoading(true);
      const location = await Location.geocodeAsync(address);

      if (location.length > 0) {
        const { latitude, longitude } = location[0];
        return { latitude, longitude };
      } else {
        return null;
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const setLocationMarkers = async () => {
    try {
      const coords = await getCoords();
      setMarkerLocation(coords);
    } catch (error) {
      setError("Error setting marker location");
    }
  };

  const getCurrentPlace = async () => {
    setLoading(true);

    try {
      const coords = await getCoords();
      const location = await Location.reverseGeocodeAsync({ ...coords });

      if (location && location.length > 0 && coords) {
        console.log(location);
        const formattedAddress = `${location[0].country}, ${location[0].city}, ${location[0].street}, ${location[0].streetNumber}`;
        return formattedAddress;
      } else {
        return null;
      }
    } catch (error) {
      setError("Error fetching place data");
    } finally {
      setLoading(false);
    }
  };

  return {
    setLocationMarkers,
    markerLocation,
    getCurrentPlace,
    getLocationFromAddress,
    loading,
    error,
  };
};
