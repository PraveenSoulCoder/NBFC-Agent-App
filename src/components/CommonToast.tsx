import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import {
  Text,
  StyleSheet,
  Animated,
  Platform,
  UIManager,
  Image,
  View,
  Dimensions
} from "react-native";
  import { theme } from "../constants";
  
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Toast = (props: any, ref: any) => {
  const [showToast, setShowToast] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toast = () => {
    if (!showToast) {
      setShowToast(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start(() => {
          setShowToast(false);
        });
      }, 3000);
    }
  };

  useImperativeHandle(ref, () => ({
    toast,
  }));

  if (showToast) {
    return (
      <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
        <View style={{ flexDirection: "row",alignItems:"center" }}>
          <View
            style={{
              backgroundColor: "#e32f45",
              borderRadius: 100,
              justifyContent: "center",
              width: windowWidth / 10,
              height: windowWidth / 10,
              alignItems:"center"
            }}
          >
            <Image
              source={require("../assets/logo.png")}
              style={{
                width: "80%",
                height: "80%",
              }}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.toastText}>{props.message}</Text>
        </View>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 30,
    overflow: "hidden",
    flexDirection: "row",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  toastContainer: {
    backgroundColor: "#0000009E",
    borderRadius: 13,
    padding: 10,
    position: "absolute",
    bottom: windowHeight / 6,
    alignSelf: "center",
    zIndex: 10,
    alignItems: "center",
  },
  toastText: {
    color: "#fff",
    fontSize: windowWidth / 30,
    margin: 5,
    ...theme.FONTS.Mulish_500Medium,
    maxWidth: windowWidth / 1.7,
    textAlignVertical: "center",
  },
});

export default forwardRef(Toast);