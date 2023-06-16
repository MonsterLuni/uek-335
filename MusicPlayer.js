import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

export default function MusicPlayer() {

  const [playState, setPlayState] = useState(false);
  const [songId, setSongId] = useState(0);
  const [sound, setSound] = useState(null);
  // Ab hier Konstanten für Text
  const [title, setTitle] = useState("-");
  const [author, setAuthor] = useState("-");

  const songs = [
    {
      title: "HOME",
      author: "Resonance",
      path: require("./assets/Music/Resonance.mp3")
    },
    {
      title: "Drinking Water",
      author: "Frank Sinatra, Antônio Carlos Jobim",
      path: require("./assets/Music/Drinking_Water.mp3")
    },
    {
      title: "Fart",
      author: "Fartigal",
      path: require("./assets/Music/fart.mp3")
    }
  ]

  async function startSong(forceReload, id = songId){
    let startsound = sound;
    if(!startsound || forceReload){
      console.log(id);
      startsound = (await Audio.Sound.createAsync(songs[id].path)).sound;
      setSound(startsound);
      setSongId(id);
      setAuthor(songs[id].author)
      setTitle(songs[id].title)
    }
    await startsound.playAsync();
    setPlayState(true);
  }

  function stopSong(){
    if(!sound) return
    sound.pauseAsync();
    setPlayState(false);
  }
  function nextSong(){
    stopSong();
    startSong(true, (songId + 1) % songs.length);
  }
  function previousSong(){
    stopSong();
    startSong(true, Math.abs((songId - 1) % songs.length));
  }
  
  return (
    <View style={styles.container}>
      <Text>Dies wird der MusicPlayer!</Text>
      <Text>Title: {title}</Text>
      <Text>Author: {author}</Text>
      <Button title={(playState ? "pause" : "start")} onPress={playState ? stopSong : startSong} />
      <Text></Text>
      <Button title="Next Song" onPress={nextSong}/>
      <Text></Text>
      <Button title="Previous Song" onPress={previousSong}/>
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
