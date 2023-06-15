import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

export default function App() {

  const [sound, setSound] = useState();
  var [Status, setStatus] = useState(false);
  var [Statusmessage, setStatusmessage] = useState("Play Song");
  var [loading, setloading] = useState(true);

  async function changestateofSound() {
    if(Status == true){
      sound.pauseAsync();
      console.log("GESTOPPT");
      setStatusmessage("Resume Song")
      setStatus(false);
    }
    else{
      if(loading == true){
        console.log('Loading Sound');
        const {sound} = await Audio.Sound.createAsync(require("./assets/Music/Drinking_Water.mp3"));
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
        setloading(false);
      }
      else{
        sound.playAsync();
      }
      setStatusmessage("Pause Song")
      setStatus(true);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Dies wird der MusicPlayer!</Text>
      <Button title={(Statusmessage)} onPress={changestateofSound} />
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
