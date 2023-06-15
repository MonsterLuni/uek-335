import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ClassicsScreen() {
  return (
    <View style={styles.container}>
      <Text>Classics Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
