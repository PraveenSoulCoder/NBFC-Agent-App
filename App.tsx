import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MessageBox from "./src/components/MessageBox";
import NetInfo from "@react-native-community/netinfo";
import { Provider } from "react-redux";
import store from "./src/store/store";
import LoadingBox from "./src/components/LoadingBox";
import React, { useState, useEffect } from "react";
import {
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
} from "@expo-google-fonts/mulish";

import StackNavigator from "./src/navigation/StackNavigator";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Sending"]);

const App: React.FC = () => {
    const [netinfos, setnetinfos] = useState(false);
    const [loading, setLoading] = useState(true);
    let [fontsLoaded] = useFonts({
        Mulish_400Regular,
        Mulish_500Medium,
        Mulish_600SemiBold,
        Mulish_700Bold,
    });
useEffect(()=>{
setnetinfos(false);
},[])
    useEffect(() => {
        const data = NetInfo.addEventListener((state) => {
          const offline = !(state?.isConnected && state?.isInternetReachable);
          setnetinfos(state.isInternetReachable == null? true : 
            state.isInternetReachable);
        });
    
        return () => {
          data();
        };
      }, []);
    if (fontsLoaded) {
        return netinfos?(
            <NavigationContainer>
                
      
                        <SafeAreaProvider>
                        <Provider store={store}>
                            <StackNavigator />
                        </Provider>
                    </SafeAreaProvider>    

                
            </NavigationContainer>
        ):(<NavigationContainer><MessageBox/></NavigationContainer>);
    } else {
        return (
            <LoadingBox></LoadingBox>
        );
    }
};

export default App;
