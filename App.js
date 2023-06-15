import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

export default function App() {

  const [sound, setSound] = useState();
  var [Status, setStatus] = useState(false);

  async function changestateofSound() {
    if(Status == true){
      sound.stopAsync();
      console.log("GESTOPPT");
      setStatus(false);
    }
    else{
      console.log('Loading Sound');
      const {sound} = await Audio.Sound.createAsync(require("./assets/Music/Resonance.mp3"));
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync();
      console.log(Status);
    
      setStatus(true);
      console.log(Status);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Dies wird der MusicPlayer!</Text>
      <Button title="Play Sound" onPress={changestateofSound} />
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
