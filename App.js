import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import ClassicsScreen from "./ClassicsScreen";
import MapScreen from "./MapScreen";
import HomeScreen from "./HomeScreen";
import CameraScreen from "./CameraScreen";
import SalaryScreen from "./SalaryScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Classics") {
              iconName = "music";
            } else if (route.name === "Map") {
              iconName = "map";
            } else if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Camera") {
              iconName = "camera";
            } else if (route.name === "Salary") {
              iconName = "dollar";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#30348c",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Classics" component={ClassicsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Salary" component={SalaryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
