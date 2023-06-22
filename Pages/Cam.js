import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ViewShot, { captureScreen } from "react-native-view-shot";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";

export default function Cam() {
  const ref = React.useRef(null);
  const imageRef = useRef();
  const [hasMediaPermission, setHasMediaPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const { width, height } = Dimensions.get("window");
  const [imageURI, setImageURI] = useState("");
  const [cropImageURI, setcropImageURI] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isDownloadable, setisDownloadable] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      setHasMediaPermission(mediaStatus.status === "granted");
      if (hasCameraPermission === false && hasMediaPermission === false) {
        return <Text>No Permission</Text>;
      }
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      MediaLibrary.saveToLibraryAsync(data.uri);
    }
  };

  const showPicture = () => {
    if (isActive === false) {
      takeScreenShot();
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const takeScreenShot = () => {
    captureScreen({
      format: "jpg",
      quality: 1,
      height: height,
      width: width,
    })
      .then(
        (uri) => {
          console.log(uri);
          setImageURI(uri);
          console.log("takeScreenShot " + imageURI);
        },
        (error) => console.error("Error ", error)
      )
      .then(cropPicture());
    if (isDownloadable === false && cropImageURI != "") {
      setisDownloadable(true);
    }
  };

  const cropPicture = async () => {
    const barHeight = (height / 100) * 21;
    const manipResult = await ImageManipulator.manipulateAsync(
      imageURI,
      [
        {
          crop: {
            originY: barHeight,
            originX: 0,
            height: height * 1.6,
            width: width * 2,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setcropImageURI(manipResult.uri);
  };

  const downloadPicture = () => {
    MediaLibrary.saveToLibraryAsync(cropImageURI);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/img/bict.png")}
        style={styles.bictLogo}
        ref={imageRef}
      />
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"16:9"}
        />
      </View>
      <TouchableOpacity
        style={styles.flip}
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      >
        <MaterialCommunityIcons name="camera-flip" size={36} color="white" />
      </TouchableOpacity>
      <View style={isActive ? styles.bar : styles.none}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <MaterialCommunityIcons name="camera" size={36} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={isDownloadable ? styles.saveButton : styles.none}
          onPress={downloadPicture}
        >
          <MaterialCommunityIcons name="download" size={36} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={showPicture}>
        {image && (
          <Image
            source={{ uri: image }}
            style={isActive ? styles.preImg : styles.preImgGreat}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    elevation: -1,
    zIndex: -1,
  },
  fixedRatio: {
    flex: 1,
  },
  bar: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 80,
    backgroundColor: "rgba(0, 0, 0, .7)",
  },
  icons: {},
  none: {
    display: "none",
  },
  flip: {
    size: 36,
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 50,
    padding: 15,
  },
  captureButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 50,
    padding: 15,
  },
  saveButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 50,
    padding: 15,
    bottom: 5,
    right: 15,
  },
  preImg: {
    position: "absolute",
    height: 70,
    width: 50,
    bottom: 5,
    left: 15,
    borderRadius: 10,
  },
  preImgGreat: {
    position: "absolute",
    height:
      Dimensions.get("window").height +
      (Dimensions.get("window").height / 100) * 3,
    width:
      Dimensions.get("window").width +
      (Dimensions.get("window").width / 100) * 3,
    bottom: 0,
    left: 0,
    borderRadius: 10,
  },
  bictLogo: {
    position: "absolute",
    top: 10,
    left: 10,
    height: 98,
    width: 233,
    elevation: 3,
    zIndex: 3,
  },
});
