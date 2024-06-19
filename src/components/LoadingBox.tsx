import { View, StyleSheet, Image, Dimensions ,StatusBar} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoadingBox = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Image
        source={require("../assets/loading.gif")}
        style={{ width: 50, height: 50 }}
      />
      <StatusBar hidden={false} translucent={true} backgroundColor={"#e32f45"}></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e32f45",
    zIndex: 1,
    width: windowWidth,
    height: windowHeight *1.05,
    // width:windowWidth,
    // height: windowHeight,
  },
});

export default LoadingBox