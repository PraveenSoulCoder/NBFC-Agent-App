import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
    Text,
    Dimensions,
    BackHandler,
    StatusBar,
    Platform,
    Linking
} from "react-native";
import React, { useState ,useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingBox from "../components/LoadingBox";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const LoadingScreen: React.FC = () => {


return(
    <SafeAreaView style={{ flex: 1 ,height:windowHeight,backgroundColor:"white"}}>
    <LoadingBox />
  </SafeAreaView>
)




}

export default LoadingScreen;