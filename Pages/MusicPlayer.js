import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Audio } from 'expo-av'

export default function MusicPlayer() {

  const [playState, setPlayState] = useState(false);
  const [songId, setSongId] = useState(0);
  const [sound, setSound] = useState(null);
  // Ab hier Konstanten für Text
  const [title, setTitle] = useState("-");
  const [author, setAuthor] = useState("-");
  const [image, setImage] = useState(require("../assets/img/Default.png"));
  const [playTime, setPlayTime] = useState();
  const [alreadyPlayed, setalreadyPlayed] = useState(0)

  const songs = [
    {
      title: "HOME",
      author: "Resonance",
      path: require("../assets/Music/Resonance.mp3"),
      image: require("../assets/img/Resonance.png")
    },
    {
      title: "Drinking Water",
      author: "Frank Sinatra, Antônio Carlos Jobim",
      path: require("../assets/Music/Drinking_Water.mp3"),
      image: require("../assets/img/Drinking_Water.png")
    },
    {
      title: "Fart",
      author: "Fartigal",
      path: require("../assets/Music/fart.mp3"),
      image: require("../assets/img/fart.png")
    },
    {
      title: "I Know",
      author: "Kanii",
      path: require("../assets/Music/I_Know.mp3"),
      image: require("../assets/img/I_Know.png")
    },
    {
      title: "Sway",
      author: "Michael Bublé",
      path: require("../assets/Music/Sway.mp3"),
      image: require("../assets/img/Sway.png")
    }
  ]

  async function startSong(forceReload, id = songId){
    let startsound = sound;
    let duration = playTime;
    if(!startsound || forceReload){
      console.log(id);
      startsound = (await Audio.Sound.createAsync(songs[id].path)).sound;
      duration = (await Audio.Sound.createAsync(songs[id].path)).status.playableDurationMillis;
      setSound(startsound);
      setPlayTime(((duration / 1000)/60).toFixed(2));
      setSongId(id);
      setAuthor(songs[id].author)
      setTitle(songs[id].title)
      setImage(songs[id].image)
    }
    await startsound.playAsync();
    setPlayState(true);
  }

  function stopSong(){
    if(!sound) return
    console.log(playTime);
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
      <Image style={styles.image} source={image}/>
      <Text>Title: {title}</Text>
      <Text>Author: {author}</Text>
      <Text>Playtime: {playTime}</Text>
      <Text>Already Played: {alreadyPlayed}</Text>
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
  image: {
    height: 200,
    width: 200,
    borderRadius: 20
  }
});
