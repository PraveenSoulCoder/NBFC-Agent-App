import React, { useState } from "react";
import {
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export type Props = {
    onPress:any;
    color:string
};

const Refresh: React.FC<Props> = ({
    onPress,
    color
    }) => {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      rotateAnimation.setValue(0);
    });
    onPress();
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  return (
    <TouchableOpacity
      onPress={() => {
        handleAnimation();
      }}
      style={{
        width: windowWidth / 15,
        height: windowHeight / 25,
      }}
    >
      <Animated.Image
        style={{
          width: windowWidth / 15,
          height: windowHeight / 25,
          transform: [
            {
              rotate: interpolateRotating,
            },
          ],
          tintColor: color,
        }}
        source={require("../assets/icons/refresh.png")}
      ></Animated.Image>
    </TouchableOpacity>
  );
};

export default Refresh;