import { View, StyleSheet, Image, Dimensions ,StatusBar} from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const InternalError = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Image
        source={require("../assets/serverLoading.gif")}
        style={{ width: 300, height: 500 }}
        resizeMode='contain'
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
    backgroundColor: "#FFFEFE",
    zIndex: 1,
    width:windowWidth,
    height: windowHeight,
  },
});

export default InternalError;