
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
  Pressable,
  Image,
  ToastAndroid,
} from "react-native";
import { Camera, CameraType, FlashMode, CameraView, useCameraPermissions } from 'expo-camera';
import { theme } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonToast from "../components/CommonToast";
import AWS from 'aws-sdk';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import LoadingBox from '../components/LoadingBox';
import * as ImageManipulator from 'expo-image-manipulator';


import PermissionModal from '../components/PermissionModal';



const FileCapture: React.FC = ({ route: { params }, navigation }: any) => {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState('back');
  const [ButtonDisable, setButtonDisable] = useState(false);
  const [fileUri, setFileUri] = useState("")
  const [isCaptured, setIsCaptured] = useState(false)

  const [loading, setLoading] = useState(false)
  // const [flashMode, setFlashMode] = React.useState(FlashMode.off)
  const spaceEndpoint = new AWS.Endpoint("https://sgp1.digitaloceanspaces.com");


  const accessKeyId = "S6ZJJUAZFVQPOATTLMIY";
  const secretAccessKey = "8/Y8jZ8F53/7L8zmK1JI/YdimOt//G3ug2xpmRO7FYc";
  const bucketName = 'retailcashbacks/uploads';

  const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(spaceEndpoint),
    accessKeyId,
    secretAccessKey,
    s3ForcePathStyle: true, // Use path-style URLs for S3
    signatureVersion: 'v4', // Ensure the use of AWS Signature Version 4
  });

  const cameraref: any = useRef(null);
  const [toatsMsg, setToastMsg] = useState("")
  const ToastRef = useRef<any>(null);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    setIsCaptured(true)
    const photo: any = await cameraref.current.takePictureAsync();
    // const originalFileInfo = await FileSystem.getInfoAsync(photo.uri);
    // console.log('Original Size:', originalFileInfo.size);
    // console.log("photo", photo)
    const manipResult = await  compressImage(photo.uri)
    // const compressedFileInfo = await FileSystem.getInfoAsync(manipResult.uri);
    // console.log("manipResult", manipResult)
    // console.log('Compressed Size:', compressedFileInfo.size);

    setPreviewVisible(true)
    setCapturedImage(manipResult)
  }
  
  const compressImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [],
      { compress: 0.65, format: ImageManipulator.SaveFormat.JPEG }
    );
    return manipResult;
  };

  const __savePhoto = async () => {
    setButtonDisable(true)
    let action = params.action;
    console.log("capturedImage", capturedImage)
    let fileUris: any = await handleUpload(capturedImage, action)

  }

  useEffect(() => {
    if (fileUri.length > 0) {
      let nextScreen: any = params.screenName;
      if (!fileUri.includes("https://")) {
        navigation.navigate(nextScreen, { "fileUri": "https://" + fileUri })
      } else {
        navigation.navigate(nextScreen, { "fileUri": fileUri, "photoType": params.photoType })

      }
    }
  }, [fileUri])
  const __retakePicture = () => {
    setIsCaptured(false)
    setButtonDisable(false)
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }


  const handleUpload = async (file: any, name: any) => {
    if (!file) {
      console.log('Please select a file first.');
      return;
    }
    setLoading(true);
    try {
      const fileInfo = await FileSystem.getInfoAsync(file.uri);
      const fileData = await FileSystem.readAsStringAsync(file.uri, { encoding: FileSystem.EncodingType.Base64 });
      const fileBuffer = Buffer.from(fileData, 'base64');
      let storename = name + "_" + Math.floor(Math.random() * 1000)
      const params = {
        Bucket: bucketName,
        Key: `${storename}.jpg`,
        Body: fileBuffer,
        ACL: 'public-read', // or private, based on your needs
        ContentType: 'image/jpeg', // Adjust based on your file type
      };

      console.log('params (without Body)', { ...params, Body: '<Base64 String>' });

      const data = await s3.upload(params).promise();

      if (data.Location) {
        console.log('data.Location', data.Location);
        setFileUri(data.Location);
        setLoading(false);
        return { 'Success': data.Location };
      } else {
        setLoading(false);
        return { 'Error': 'URL Not found' };
      }
    } catch (error) {
      console.error('Error during file upload: ', error);
      return { 'Error': error.message };
    }
  };


  const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {

    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              padding: 15,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={retakePicture}
                style={{
                  borderRadius: 20,
                  backgroundColor: theme.COLORS.primary,
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...theme.FONTS.Mulish_600SemiBold,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Re-take
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={ButtonDisable}
                onPress={savePhoto}
                style={{
                  borderRadius: 20,
                  backgroundColor: theme.COLORS.primary,
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: ButtonDisable ? 0.7 : 1
                }}
              >
                <Text
                  style={{
                    ...theme.FONTS.Mulish_600SemiBold,
                    color: "#fff",
                    fontSize: 16,
                  }}
                >
                  Save Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return loading ? <LoadingBox /> : (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >

        {previewVisible && capturedImage ? (
          <CameraPreview
            photo={capturedImage}
            savePhoto={__savePhoto}
            retakePicture={__retakePicture}
          />
        ) : (
          <CameraView
            // type={cameraType}
            // flashMode={flashMode}
            style={{ flex: 1 }}
            ref={cameraref}
            facing={cameraType}
          >
            <View style={{ width: "100%", }}>
              <Pressable onPress={() => { navigation.goBack() }} style={{ paddingHorizontal: 25, paddingVertical: 20, justifyContent: "center", alignItems: "center", alignSelf: "flex-end", }}>
                <Image source={require('../assets/icons/cross.png')} style={{ width: 20, height: 20, tintColor: "white" }} />
              </Pressable>
            </View>

            {['pan', 'aadhar', 'agreement'].includes(params.photoType) ?
            <View style={{ flex: 1, width: "100%", backgroundColor: "transparent", justifyContent: "center", alignItems: "center", }}>
              <View style={{ backgroundColor: "transparent", width: Dimensions.get("window").width - 50, height: Dimensions.get("window").height - 300, borderColor: "white", borderWidth: 2, borderRadius: 10, }}>

              </View>
            </View> :
            <View style={{ flex: 1, width: "100%", backgroundColor: "transparent", justifyContent: "center", alignItems: "center", }}/>
            }

            <TouchableOpacity disabled={isCaptured} onPress={__takePicture} style={{ width: 70, height: 70, bottom: 0, borderRadius: 50, backgroundColor: "#fff", alignSelf: "center", marginBottom: 20 }} />


          </CameraView>
        )}
      </View>

      <CommonToast ref={ToastRef} message={toatsMsg} />
      <StatusBar hidden={false} translucent={true} backgroundColor={"#e32f45"}></StatusBar>
    </SafeAreaView>
  );
}

export default FileCapture;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})




