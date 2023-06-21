import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome} from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function MusicPlayer() {

  //All Constants that are used with useStates
  const [playState, setPlayState] = useState(false);
  const [songId, setSongId] = useState(0);
  const [sound, setSound] = useState(null);
  const [title, setTitle] = useState("-");
  const [author, setAuthor] = useState("-");
  const [image, setImage] = useState(require("../assets/img/Default.png"));
  const [playTime, setPlayTime] = useState("00:00");
  const [playTimeSeconds, setPlayTimeSeconds] = useState();
  const [alreadyPlayed, setalreadyPlayed] = useState("00:00");
  const [alreadyPlayedSeconds, setalreadyPlayedSeconds] = useState(0);

  //Array for all Songs that should be playable
  const songs = [
    {
      title: "HOME",
      author: "Resonance",
      path: require("../assets/Music/Resonance.mp3"),
      image: require("../assets/img/Resonance.png")
    },
    {
      title: "Drinking Water",
      author: "Frank Sinatra · Antônio Carlos Jobim",
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
      title: "Annihilate",
      author: "Swae Lee · Lil Wayne",
      path:require("../assets/Music/Annihilate.mp3"),
      image: require("../assets/img/Annihilate.png")
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

  //Function to Start a song, if (forcereload) is true, it's playing a new one
  async function startSong(forceReload = false, id = songId){
    let startsound = sound;
    if(!startsound || forceReload == true){
      console.log(id);
      startsound = (await Audio.Sound.createAsync(songs[id].path)).sound;
      duration = (await Audio.Sound.createAsync(songs[id].path)).status.playableDurationMillis;
      setSound(startsound);
      setPlayTime(((duration / 1000)/60).toFixed(2).slice(0,-3).padStart(2,"0") + ":" + ((duration/1000) % 60).toFixed(0).padStart(2,"0"));
      setPlayTimeSeconds(duration/1000);
      setSongId(id);
      setAuthor(songs[id].author)
      setTitle(songs[id].title)
      setImage(songs[id].image)
      await startsound.playAsync();
    }
    else{
      await startsound.playFromPositionAsync(alreadyPlayedSeconds*1000);
    }
    setPlayState(true);
  }

  //Is stopping a sound, sets playstate to (false)
  function stopSong(){
    if(!sound) return
    sound.pauseAsync();
    setPlayState(false);
  }

  //Is going to the next sound, if it hits the end, it's going for the first song in the array.
  function nextSong(){
    stopSong();
    setalreadyPlayedSeconds(0);
    startSong(true, (songId + 1) % songs.length);
  }

  //Is going to the last song, doesn't break if it hits ID = 0
  function previousSong(){
    stopSong();
    setalreadyPlayedSeconds(0);
    startSong(true, Math.abs((songId - 1) % songs.length));
  }

  //This handles the passing seconds that a sound already played
  useEffect(() => {
    let id;
    if(playState){
      id = setInterval(() => 
      {
        setalreadyPlayedSeconds((alreadyPlayedSeconds) => alreadyPlayedSeconds + 1);
      }, 1000
      );
    }
    else{
      clearInterval(id);
    }
    return () => {
      clearInterval(id);
    };
    //Here is the useState for that the function updates
  }, [playState]);

  //Is for checking if the song is finished, if it is it's going to the function (nextSong())
  useEffect(() => {
    if(alreadyPlayedSeconds > playTimeSeconds){
      nextSong();
    }
    setalreadyPlayed(((alreadyPlayedSeconds/60).toFixed(2).slice(0,-3).padStart(2,"0")) + ":" + (alreadyPlayedSeconds % 60).toFixed(0).padStart(2,"0"))
    //Here are the useStates for that the function updates
  }, [alreadyPlayedSeconds,playTimeSeconds])
  
  //Here is everything that gets rendered
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BiCT Classics</Text>
        <View style={styles.separator}/>
      </View>
      <Text>{author}</Text>
      <Image style={styles.image} source={image}/>
      <Text style={styles.songtitle}>{title}</Text>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        value={alreadyPlayedSeconds}
        step={1}
        maximumValue={playTimeSeconds}
        onValueChange={console.log("Already Played: " + alreadyPlayedSeconds + "s")}
        maximumTrackTintColor="#636363"
        minimumTrackTintColor="#5182bd"
      />
      <View style={styles.time}>
        <Text>{alreadyPlayed}</Text>
        <Text>{playTime}</Text>
      </View>
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

//Here are the Styles for the Project
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
    marginBottom: 20,
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
    marginTop:20
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-between'
  }
});
