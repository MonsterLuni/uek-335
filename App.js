import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";


import Salary from "./Pages/Salary";
import Cam from "./Pages/Cam";
import Map from "./Pages/Map";
import MusicPlayer from "./Pages/MusicPlayer";
import Home from "./Pages/Home";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          "tabBarActiveTintColor": "#30348c",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ],
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
        <Tab.Screen name="Classics" component={MusicPlayer} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Camera" component={Cam} />
        <Tab.Screen name="Salary" component={Salary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
