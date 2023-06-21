import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Image } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Salary from "./Salary";
import Cam from "./Cam";
import Map from "./Map";
import MusicPlayer from "./MusicPlayer";

const Stack = createStackNavigator();

export default function Home({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate(category);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/bict.png')} style={styles.img}/>
      <Text style={styles.title}>Wilkommen in der BiCT App!</Text>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categorySquare}
          onPress={() => handleCategoryPress('Classics')}
        >
          <Text style={styles.categoryText}>Classics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categorySquare}
          onPress={() => handleCategoryPress('Salary')}
        >
          <Text style={styles.categoryText}>Salary</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categorySquare}
          onPress={() => handleCategoryPress('Camera')}
        >
          <Text style={styles.categoryText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categorySquare}
          onPress={() => handleCategoryPress('Map')}
        >
          <Text style={styles.categoryText}>Map</Text>
        </TouchableOpacity>
      </View>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Classics" component={MusicPlayer} />
          <Stack.Screen name="Salary" component={Salary} />
          <Stack.Screen name="Camera" component={Cam} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
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
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categorySquare: {
    width: 150,
    height: 150,
    margin: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
