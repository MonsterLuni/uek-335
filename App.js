import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef, Component } from "react";
import MapView, { Marker } from "react-native-maps";
import * as WebBrowser from "expo-web-browser";
import { Button, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://otool.bict.ch/login"
    );
    setResult(result);
  };

  const bict_coords = {
    latitude: 46.95586,
    longitude: 7.47572,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const mapRef = useRef(null);

  const goToBict = () => {
    mapRef.current.animateToRegion(bict_coords, 3 * 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BiCT AG</Text>
      <Text style={styles.roast}>Dein Lohn: 0! 💀</Text>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={bict_coords} style={styles.marker}>
          <CustomMarker />
        </Marker>
      </MapView>
      <Button
        onPress={() => goToBict()}
        title="Nach BiCT"
        style={styles.home}
      ></Button>
      <Button title="Otool öffnen" onPress={_handlePressButtonAsync} />
      <WebView source={{ uri: "https://otool.bict.ch/" }} />
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
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    color: "#30348c",
  },
  roast: {
    fontSize: 20,
    color: "black",
  },
  map: {
    width: "80%",
    height: "50%",
    borderRadius: 20,
    margin: 15,
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
  home: {
    color: "#30348c",
    position: "flex",
  },
});
