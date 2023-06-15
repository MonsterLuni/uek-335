import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

export default function App() {

  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const {sound} = await Audio.Sound.createAsync(require("./assets/Music/a.mp3"));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  return (
    <View style={styles.container}>
      <Text>Dies wird der MusicPlayer!</Text>
      <Button title="Play Sound" onPress={playSound} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
