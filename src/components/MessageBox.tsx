import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  Button,
  Dimensions,
  Image,
  StatusBar
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MessageBox = (props: any) => {
  const navigation: any = useNavigation();
  const [modal, setmodal] = useState(true);
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Image
        source={require("../assets/loader.gif")}
        style={{ width: 75, height: 75 }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          top: windowHeight / 5,
        }}
      >
        <Text style={{ fontSize: 20, color: "#FF808F" }}>Loading...</Text>
      </View>
      <StatusBar hidden={false} translucent={true} backgroundColor={"#e32f45"}></StatusBar>
    </View>
  );
};
export default MessageBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e32f45",
    zIndex: 1,
    width: windowWidth,
    height: windowHeight *1.05,
  },
});
