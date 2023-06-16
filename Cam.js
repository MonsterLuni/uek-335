import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Camera, FaceDetectionResult } from "expo-camera";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { FontAwesome } from "@expo/vector-icons";

export default function Cam() {
  const ref = React.useRef(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

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
    }
  };

  const [isActive, setIsActive] = useState(true);

  const showPicture = () => {
    if (isActive === false) {
      setIsActive(true);
    } else {
      setIsActive(false);
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
      <Image source={require("./img/bict_logo.png")} style={styles.bictLogo} />
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
        <Image style={styles.button} source={require("./icons/flip.png")} />
      </TouchableOpacity>
      <View style={styles.bar}>
        <View style={styles.btn}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <FontAwesome name="camera" size={36} color="white" />
          </TouchableOpacity>
        </View>
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
  },
  fixedRatio: {
    flex: 1,
  },
  bar: {
    flex: 1,
    position: "absolute",
    bottom: 40,
    width: "100%",
    height: 80,
    backgroundColor: "rgba(0, 0, 0, .7)",
  },
  btn: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  icons: {},
  flip: {
    size: 36,
    position: "absolute",
    top: 50,
    right: 10,
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
  preImg: {
    position: "absolute",
    height: 70,
    width: 50,
    bottom: 45,
    left: 10,
    borderRadius: 10,
  },
  preImgGreat: {
    position: "absolute",
    height: 850,
    width: 400,
    bottom: 10,
    left: 8,
    borderRadius: 10,
  },
  bictLogo: {
    position: "absolute",
    top: 60,
    left: 20,
    height: 98,
    width: 233,
    zIndex: 3,
    elevation: 3,
  },
});