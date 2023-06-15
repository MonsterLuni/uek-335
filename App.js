import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef, Component } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from 'expo-location';
import { getDistance } from "geolib";



export default function App() {
  //const [result, setResult] = useState(null);

  const[location , setLocation]= useState(null);
  const[errorMsg , setErrorMsg]= useState(null);
  useEffect( () => {
    (async() => {
      let {status}= await Location.requestForegroundPermissionsAsync();
      if (status !=='granted')
      {
        setErrorMsg('Permission to access locatiob was denied');
        return; 
      }
      let location= await Location.getCurrentPositionAsync({});
      setLocation(location);
  
    })();

  },[]);
  let text= 'Waiting...';
  
  if(errorMsg)
  {
    text(errorMsg)
  }
  else if(location) {
   text = JSON.stringify(location);

  }


  const bict_coords = {
    latitude: 46.95586,
    longitude: 7.47572,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const mapRef = useRef(null);

  const goToBict = () => {
    mapRef.current.animateToRegion(bict_coords, 1 * 1000);
  };

  const calculateDistance = () => {
    if (location) {
      const currentCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      const distance = getDistance(currentCoords, bict_coords);
      const distanceInKm = distance / 1000;

      if(distanceInKm < 0.05) {
        return 'Present'
      }

      else{return `${distanceInKm} KM`;}

      
    }

    return '';
  };

  const distanceToBict = calculateDistance();

  return (
    <View style={styles.container}>

      <Text>BiCT Distance: {distanceToBict}</Text>

      <MapView
      ref={mapRef}
      showsMyLocationButton= {true}
      showsUserLocation= {true}
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

      <Button
        onPress={() => goToBict()}
        title="Nach BiCT"
        style={styles.home}
      ></Button>
        


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
