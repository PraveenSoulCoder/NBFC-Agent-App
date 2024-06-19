import React, { useRef, useEffect, useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Animated,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
  Linking
} from "react-native";
import { theme } from "../constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;



const PermissionModal = ({
  permissionContent,
  visible,
  closeModal}: any) => {
  const permissionSlideAnim = useRef(new Animated.Value(-200)).current;
  const permissionFadeAnim = useRef(new Animated.Value(0)).current;
  

  const permissionCloseModal = () => {
    console.log("permissionCloseModal");
    Animated.timing(permissionFadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      closeModal();
    });

    Animated.spring(permissionSlideAnim, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (visible) {
      Animated.spring(permissionSlideAnim, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(permissionFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      permissionCloseModal();
    }
  }, [visible]);

  const openSettings = () => {
    console.log("openSettings");
    closeModal();
    Linking.openSettings();
  };

  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: "#00000084" }}
        onPress={permissionCloseModal}
        activeOpacity={1}
      ></TouchableOpacity>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 20,
          width: windowWidth / 1.1,
          position: "absolute",
          alignSelf: "center",
          transform: [{ translateY: permissionSlideAnim }],
          opacity: permissionFadeAnim,
          top: "37%",
        }}
      >
        <View style={{ margin: 10 }}>
          <Text
            style={{
              fontSize: windowWidth / 15,
              textAlign: "left",
              color: "#525252",
              bottom: 10,
              ...theme.FONTS.Mulish_700Bold,
            }}
          >
            Allow Permissions
          </Text>
          <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
           {permissionContent=="Notification" && <Image
              source={require("../assets/icons/notification.png")}
              style={{
                width: windowWidth / 14,
                height: windowWidth / 14,
                tintColor: "#ababab",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />}
            {permissionContent=="Location" && <Image
               source={require("../assets/icons/location.png")}
              style={{
                width: windowWidth / 14,
                height: windowWidth / 14,
                tintColor: "#ababab",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />}
            {permissionContent=="Camera" && <Image
              source={require("../assets/icons/camera1.png")}
              style={{
                width: windowWidth / 14,
                height: windowWidth / 14,
                tintColor: "#ababab",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />}
            {permissionContent=="Microphone" && <Image
               source={require("../assets/icons/microphone.png")}
              style={{
                width: windowWidth / 14,
                height: windowWidth / 14,
                tintColor: "#ababab",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />}
            {permissionContent=="Download" && <Image
               source={require("../assets/icons/download.png")}
              style={{
                width: windowWidth / 14,
                height: windowWidth / 14,
                tintColor: "#ababab",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />}
            <Text
              style={{
                textAlign: "left",
                color: "#a3a3a3",
                fontSize: windowWidth / 18,
                width: windowWidth / 1.4,
                marginLeft: 10,
                ...theme.FONTS.Mulish_500Medium
              }}
            >
              {permissionContent}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: windowWidth / 1.12,
              paddingRight: 30,
              marginTop: 25,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#e6e6e6",
                width: windowWidth / 4,
                padding: 7,
                borderRadius: windowWidth / 40,
              }}
              onPress={closeModal}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#6b6a6a",
                  fontSize: windowHeight / 40,
                  ...theme.FONTS.Mulish_600SemiBold
                }}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              style={{
                backgroundColor: "#e3f2ff",
                width: windowWidth / 2.6,
                padding: 7,
                borderRadius: windowWidth / 40,
              }}
              onPress={openSettings}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0E83F7",
                  fontSize: windowHeight / 40,
                  ...theme.FONTS.Mulish_600SemiBold
                }}
              >
                Open Settings
              </Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default PermissionModal;
