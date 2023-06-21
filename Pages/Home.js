import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <View style={styles.container}>
    <Image source={require('../assets/img/bict.png')} style={styles.img}/>
    <Text style={styles.title}>Wilkommen in der BiCT App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingBottom: 20,
  },
  img: {
    width: 350,
    height: 145,
    marginBottom: 60
  },
  title: {
    fontSize: 30,
  }
})
