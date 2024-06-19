import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import {DevSettings} from 'react-native';
import NetInfo from '@react-native-community/netinfo'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Toast() {
  const [modal, setmodal] = useState(false);

  useEffect(()=>{
    setmodal(true)
    setTimeout(()=>{setmodal(false)},3000)
 },[]) 
 
 
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Image
        source={require("../assets/loading.gif")}
        style={{ width: 300, height: 200 }}
      />
      <Modal transparent={true} visible={modal} animationType="fade">
        <View
          style={{
            alignItems: "center",
            height: "90%",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              backgroundColor: "#e32f45",
              fontSize: 17,
              padding: 6,
              color: "#ffffff",
              borderRadius: 5,
              marginBottom: 20,
            }}
          >
           No Connection
          </Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});