


import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform,StyleSheet ,StatusBar,Alert,SafeAreaView,Linking ,Modal,BackHandler,ScrollView,RefreshControl ,Pressable} from 'react-native';
import {WebView} from 'react-native-webview';
import { AntDesign } from "@expo/vector-icons";

const WebviewScreen: React.FC = ({route: {params},navigation  }: any) => {
    //const navigation : any = useNavigation();
  const [startURL, setstartURL] = useState('https://mykaasu.com/');
  //const [startURL, setstartURL] = useState('https://mykaasu.com/customer/');
  const webView : any = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
const [refresherEnabled, setEnableRefresher] = useState(true);
  


useEffect(() => {
    // Update the document title using the browser API
    setstartURL(params.webURL)
  });
 

  const handleScroll = (event : any) =>  {
    const yOffset = Number(event.nativeEvent.contentOffset.y)
    if (yOffset === 0){
      setEnableRefresher(true)
    }else{
      setEnableRefresher(false)
    }
  }
  const goback = () => {
    webView.current.goBack();
  };
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webView?.current) {
        webView?.current?.goBack(); //go back a single webview page
        return true; //returning true disables default back action
      } else {
        Alert.alert(
          'Hold on!',
          'Are you sure you want to go back?',
          [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ],
          {cancelable: true},
        );
        return true; //returning true disables default back action
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [canGoBack]);
 

  
   
  
 
  


  return (
     <SafeAreaView style={{flex: 1}}>
    <View style={{height:30,backgroundColor:"white"}}><Pressable onPress={()=>{navigation.navigate("TabNavigator",{myRoute:"yes",screenName:"Home"});}}><Text style={{textAlign:"right",paddingRight:20,fontSize:24}}>x</Text></Pressable></View>
     <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
            <RefreshControl
              refreshing={false}
              enabled={refresherEnabled}
              onRefresh={()=>{webView.current.reload()}} // exl in function : this.yourWebview.reload();
            />
        }>
      
       <WebView
         onError={() => {
           //do nothing
         }}
         ref={webView}
         source={{
           uri: `${startURL}`,
         }}
         startInLoadingState={true}
         onLoadProgress={event => setCanGoBack(event?.nativeEvent?.canGoBack)}
         javaScriptEnabled={true}
         domStorageEnabled={true}
         onScroll={handleScroll}
            originWhitelist={['qrcode://launch','https://*','http://*','paytmmp://*',"gpay://*",'phonepe://*','about:*',"whatsapp://*","fb://*","instagram://*","twitter://*","tg://*"]}
         onShouldStartLoadWithRequest={event => {
        if (event.url.includes("upi://") || event.url.includes("gpay://") ||event.url.includes("paytmmp://")||event.url.includes("phonepe://")||event.url.includes("fb://") || event.url.includes("whatsapp://")||event.url.includes("instagram://") ||event.url.includes("twitter://") ||event.url.includes("tg://")  ) {
          Linking.openURL(event.url)
          return false
            }
            return event.url.startsWith(event.url);
            
              return true
                
         }}
       />
       
       
     
   {Platform.OS == "ios" && <View style={styles.navbar}>
        <View style={styles.back}>
          <AntDesign name="left" size={25} color="white" onPress={goback} />
        </View>
      </View> }   
     
     </ScrollView>
     <StatusBar hidden={false} translucent={true} backgroundColor={"#e32f45"}></StatusBar>
   </SafeAreaView>
   
  );


  
}
export default WebviewScreen;
const styles = StyleSheet.create({
   navbar: {
    height: 40,
    width: "100%",
    flexDirection: "row-reverse",
    paddingTop: 6,
    backgroundColor: "#B22222",
    borderTopColor: "grey",
    borderTopWidth: 1,
  },
  back: {
    width: 70,
    height: 70,
    marginLeft: 'auto',
    paddingLeft:10,
    color:'#FFFFFF'
  },
  forward: {
    width: 50,
    height: 50,
  },
});
















