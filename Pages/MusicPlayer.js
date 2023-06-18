import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome} from '@expo/vector-icons';

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

  async function startSong(forceReload = false, id = songId){
    let startsound = sound;
    if(!startsound || forceReload == true){
      console.log(id);
      console.log("Hallo, ich bin in StartSound");
      startsound = (await Audio.Sound.createAsync(songs[id].path)).sound;
      duration = (await Audio.Sound.createAsync(songs[id].path)).status.playableDurationMillis;
      setSound(startsound);
      setPlayTime(((duration / 1000)/60).toFixed(2).replace(".",":").padStart(5,"0"));
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
    console.log("Hallo, ich bin in StopSong");
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
      <View style={styles.header}>
        <Text style={styles.title}>BiCT Classics</Text>
        <View style={styles.separator} />
      </View>
      <Text>{author}</Text>
      <Image style={styles.image} source={image}/>
      <Text style={styles.songtitle}>{title}</Text>
      <Text>{playTime}</Text>
      <Text>Already Played: {alreadyPlayed}</Text>
      <View style={styles.controller}>
        <TouchableHighlight onPress={previousSong}>
          <View>
            <FontAwesome name='backward' size={30} color={"#919191"}/>
          </View>
        </TouchableHighlight>
  
        <TouchableOpacity style={styles.startPause} onPress={playState ? stopSong : startSong}></TouchableOpacity>

        <TouchableHighlight onPress={nextSong}>
          <View>
            <FontAwesome name='forward' size={30} color={"#919191"}/>
          </View>
        </TouchableHighlight>
      </View>
      <StatusBar style="auto"/>
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
  image: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderRadius: 100
  },
  songtitle: {
    marginTop: 20,
    fontSize: 30
  },
  header: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#30348c",
    marginBottom: 10,
  },
  separator: {
    width: 200,
    height: 2,
    backgroundColor: "#30348c",
    marginBottom: 20,
  },
  startPause: {
    backgroundColor: "#9D9D9D",
    opacity: 100,
    height: 100,
    width: 100,
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 20
  },
  controller: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});
