import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef, Component } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import { getDistance } from "geolib";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting...';

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const bict_coords = {
    latitude: 46.95586,
    longitude: 7.47572,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const mapRef = useRef(null);

  const calculateDistance = () => {
    if (location) {
      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const distance = getDistance(currentCoords, bict_coords);
      const distanceInKm = distance / 1000;

      if (distanceInKm < 0.05) {
        return 'Present';
      } else {
        return `${distanceInKm} KM`;
      }
    }

    return '';
  };

  const distanceToBict = calculateDistance();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BiCT Distance</Text>
        <View style={styles.separator} />
      </View>
      <Text style={styles.distance}>{distanceToBict}</Text>
      <MapView
        ref={mapRef}
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: 46.95586,
          longitude: 7.47572,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={bict_coords} style={styles.marker}>
          <CustomMarker />
        </Marker>
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

function CustomMarker() {
  return (
    <View style={styles.marker}>
      <Text style={styles.color}>BiCT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#30348c",
    marginBottom: 10,
  },
  separator: {
    width: 200,
    height: 2,
    backgroundColor: "#30348c",
    marginBottom: 10,
  },
  distance: {
    fontSize: 18,
    color: "#30348c",
    marginBottom: 10,
  },
  map: {
    width: "95%",
    height: "80%",
    borderRadius: 20,
    marginTop: 10,
  },
  marker: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderColor: "#30348c",
    borderRadius: 5,
    elevation: 10,
  },
  color: {
    color: "#30348c",
  },
  button: {
    color: "#30348c",
    marginTop: 10,
  },
});