import React, { useState, useEffect, useRef, useCallback } from "react";
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
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";

export default function Cam() {
  const ref = React.useRef(null);
  const imageRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  const { width, height } = Dimensions.get("window");

  if (status === null) {
    requestPermission();
  }

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      /*MediaLibrary.saveToLibraryAsync(data.uri); */
    }
  };

  const [isActive, setIsActive] = useState(true);

  const showPicture = () => {
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    takeScreenShot();
  };

  const [imageURI, setImageURI] = useState("");
  const [savedImagePath, setSavedImagePath] = useState("");

  const takeScreenShot = () => {
    if (isActive === false) {
      captureScreen({
        format: "jpg",
        quality: 0.8,
        height: height,
        width: width,
      }).then(
        (uri) => {
          setSavedImagePath(uri);
          setImageURI(uri);
        },
        (error) => console.error("Oops, Something Went Wrong", error)
      );
    } else {
    }
  };

  const downloadPicture = () => {
    if (imageURI != "") {
      MediaLibrary.saveToLibraryAsync(imageURI);
    } else {
      (error) => console.error("No imageURI!", error);
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  {
    image && <Image source={{ uri: image }} style={{ flex: 1 }} />;
  }

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
        <View style={styles.btn}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialCommunityIcons name="camera" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={isActive ? styles.saveButton : styles.none}
        onPress={takeScreenShot}
      >
        <MaterialCommunityIcons
          name="download"
          size={36}
          color="white"
          onPress={downloadPicture}
        />
      </TouchableOpacity>
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
  test: {
    position: "absolute",
    width: 200,
    height: 400,
    top: 50,
  },
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
  btn: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
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
    height: Dimensions.get("window").height - 160,
    width: Dimensions.get("window").width,
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
