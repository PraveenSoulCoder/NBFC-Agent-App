import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Modal, ToastAndroid, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { theme } from "../constants/theme";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import { TextInput } from "react-native";
import RadioButton from "../components/RadioButton";
import PermissionModal from "../components/PermissionModal";
import { Camera } from 'expo-camera';
import PinchableImage from "../components/PinchableImage";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Work_Info = ({ navigation, route }: { navigation: any, route: any }) => {

    const [workDetails, setWorkDetails] = useState({})

    const [locationtrigger, setLocationTrigger] = useState(false)
    const [permissionModal, setPermissionModal] = useState(false);
    const [permissionType, setPermissionType] = useState('');

    const [notesModal, setNotesModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("No");
    const [openPhoto, setOpenPhoto] = useState(false)

    const [updateButton, setUpdateButton] = useState(false)

    const [notes, setNotes] = useState({ subject: "Work Information", body: "All the work details are correct and verified" })

    const verifyWork = workDetails.companyLon && workDetails.companyLat
        && workDetails.companyPhoto;


    useEffect(() => {
        if (route?.params?.fileUri) {
            if (route?.params?.photoType == "company") {
                setWorkDetails({ ...workDetails, companyPhoto: route?.params?.fileUri })
            }
        } else {
            setWorkDetails(route?.params?.data)
        }
    }, [route]);

    const verifyWorkDetails = async () => {
        setUpdateButton(true)
        try {
            const apiKey = await AsyncStorage.getItem('apikey');
            if (apiKey !== null && workDetails?.companyPhoto && notes.subject !== null && notes.body !== null && workDetails?.companyLon && workDetails?.companyLat) {
                await fetch(`http://192.168.1.7:6500/business/updateAgentVerify`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: "M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz",
                        roleId: workDetails?.roleId,
                        loanId: workDetails?.loanId,
                        companyLon: workDetails?.companyLon,
                        companyLat: workDetails?.companyLat,
                        companyPhoto: workDetails?.companyPhoto,
                        subject: notes.subject,
                        body: notes.body,
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        setNotesModal(false)
                        if (responseData.Success) {
                            navigation.navigate("Home1", { no: workDetails.no })
                        }
                    })
            }
        } catch (e) {
            console.log("Error", e);
        }
    }

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {

        const R = 6371e3; // Radius of the Earth in meters
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in meters
        return distance;
    };
    const getCurrentLocation = async () => {
        setLocationTrigger(true)
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                openModal('Location')
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            const userLat = location.coords.latitude;
            const userLon = location.coords.longitude;

            const distance = getDistanceFromLatLonInMeters(userLat, userLon, workDetails.companyLatitude, workDetails.companyLongitude);

            if (distance <= 100) {
                ToastAndroid.show("Location fetched successfully", 3)
                setLocationTrigger(false)
                setWorkDetails({ ...workDetails, companyLat: location?.coords?.latitude, companyLon: location?.coords?.longitude })
            } else {
                ToastAndroid.show("You need to be within 100 meters of the company", 3)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getCameraPermission = async (type) => {

        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status !== "granted") {
            openModal('Camera');
        } else {
            if (type == "companyPhoto") {
                navigation.navigate("FileCapture", { "screenName": "work-info", "action": "userCompany_" + workDetails.loanId + "", photoType: "company" })
            }
        }

    }

    const openModal = (type) => {
        setPermissionType(type);
        setPermissionModal(true);
    };

    const closeModal = () => {
        setPermissionModal(false);
    };

    const notesModalHandler = () => {
        setNotesModal(!notesModal)
    }

    const handleSelect = (label: string) => {
        if (label == "No") {
            setNotes({ ...notes, body: "All the details are correct and verified" })
        } else {
            setNotes({ ...notes, body: "" })
        }
        setSelectedOption(label);
    };


    if (!workDetails || !workDetails.companyIdPhoto) {
        return null; // Or render some placeholder content
    }

    const isPdf = workDetails.companyIdPhoto.endsWith('.pdf');

    const handlePress = () => {
        if (isPdf) {
            Linking.openURL(workDetails.companyIdPhoto);
        }
    };

    const photoOpen = (type) => {
        setOpenPhoto(true)
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.secondary }}>
                <Header goBack={true} goBackColor={theme.COLORS.white} titleStyle={{ color: theme.COLORS.white, }} containerStyle={{ backgroundColor: theme.COLORS.primary, height: windowHeight / 9, borderBottomEndRadius: 25, borderBottomStartRadius: 25 }} title="Work Information" />
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: windowWidth - 20, height: windowHeight, alignSelf: "center", paddingVertical: 25, paddingHorizontal: 20, backgroundColor: theme.COLORS.white, marginTop: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Name </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{workDetails.companyName}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Email </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{workDetails.companyEmail}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Address </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{workDetails.companyStreet + ", " + workDetails.companyCity + ", " + workDetails.companyState + "-" + workDetails.companyPincode + ", " + workDetails.companyCountry}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company EmployeeId </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{workDetails.companyEmployeeId}</Text>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Salary </Text>
                        <Text style={{ width: "100%", color: theme.COLORS.bodyTextColor, backgroundColor: theme.COLORS.white, padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>{workDetails.companySalary}</Text>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Id Photo </Text>

                        <View style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Id Image</Text>
                            {isPdf ? (
                                <TouchableOpacity onPress={handlePress} style={{ width: '100%', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../assets/icons/pdf.png')} style={{ width: 100, height: 100, marginBottom: 15 }} />
                                    <Text style={{ color: theme.COLORS.primary, ...theme.FONTS.Mulish_700Bold }}>Open PDF to view</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={photoOpen}>

                                    <Image source={{ uri: workDetails.companyIdPhoto }} style={{ width: "100%", height:200, objectFit: "contain" }} />
                                </TouchableOpacity>

                            )}
                        </View>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Photo </Text>
                        <TouchableOpacity onPress={() => getCameraPermission("companyPhoto")} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Company Image</Text>
                            {workDetails.companyPhoto ?
                                <Image source={{ uri: workDetails.companyPhoto }} style={{ width: "100%", height: 350, objectFit: "contain" }} /> :
                                <View style={{ width: "100%", height: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                    <Image source={require('../assets/icons/camera.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, }} />
                                    <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Take Photo</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 50 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Company Current Location </Text>
                        <TouchableOpacity disabled={locationtrigger} onPress={() => getCurrentLocation()} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Location Cordinates</Text>
                            {locationtrigger? 
                                <Image source={require('../assets/loader.gif')}  style={{ width: 40, height: 40,alignSelf:"center",margin:10, }}/> :
                                
                                (workDetails.companyLon && workDetails.companyLat) ?
                                    <View style={{ width: "100%", padding: 10 }}>
                                        <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor, fontSize: 12, textAlign: "center", borderRadius: 10, marginBottom: 10, borderColor: theme.COLORS.bodyTextColor, borderWidth: 0.5, padding: 10 }}>Latitude : {workDetails.companyLat}</Text>
                                        <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor, fontSize: 12, textAlign: "center", borderRadius: 10, borderColor: theme.COLORS.bodyTextColor, borderWidth: 0.5, padding: 10 }}>Longitude : {workDetails.companyLon}</Text>
                                    </View> :
                                    <View style={{ width: "100%", padding: 10, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                        <Image source={require('../assets/icons/location.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, tintColor: theme.COLORS.primary }} />
                                        <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Get User Location</Text>
                                    </View>
                            }
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity disabled={!verifyWork} style={{ backgroundColor: theme.COLORS.primary, opacity: verifyWork ? 1 : 0.5, borderRadius: 15, alignSelf: 'flex-end', width: "50%", marginBottom: 20, paddingVertical: 10 }} onPress={notesModalHandler}>
                        <Text style={{ textAlign: "center", ...theme.FONTS.Mulish_700Bold, fontSize: 15, color: theme.COLORS.white }}> {workDetails.companyLat && workDetails.companyLon && workDetails.companyPhoto ? "Update" : "Verify"}</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: 15 }}>

                    </View>
                    
                    <PermissionModal permissionContent={permissionType} visible={permissionModal} closeModal={closeModal} />
                </ScrollView>



                <Modal transparent={true} animationType="none" visible={notesModal} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: "relative" }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: "#00000084" }} onPress={notesModalHandler} activeOpacity={1}></TouchableOpacity>
                    <View style={{ position: 'absolute', top: selectedOption === "Yes" ? "35%" : '45%', left: '50%', transform: [{ translateX: -(windowWidth - 40) / 2 }, { translateY: -25 }], width: windowWidth - 40, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold, marginBottom: 15, fontSize: 17 }}>Are you facing any issues?</Text>
                        <View style={{ flexDirection: 'row', width: "100%", marginBottom: 15 }}>
                            <RadioButton
                                label="Option 1"
                                selected={selectedOption === 'No'}
                                onSelect={() => handleSelect("No")}
                                color={theme.COLORS.primary}
                                disabled={false}
                            />
                            <Text style={{ marginRight: 10 }}>No</Text>
                            <RadioButton
                                label="Option 2"
                                selected={selectedOption === 'Yes'}
                                onSelect={() => handleSelect("Yes")}
                                color={theme.COLORS.primary}
                                disabled={false}
                            />
                            <Text>Yes</Text>

                        </View>

                        {selectedOption === "Yes" &&
                            <TextInput placeholder="Enter Your Notes..." onChange={(e) => setNotes({ ...notes, body: e.nativeEvent.text })} placeholderTextColor={theme.COLORS.bodyTextColor}
                                multiline={true} numberOfLines={4} style={{
                                    width: '100%', padding: 10, borderRadius: 10, borderColor: theme.COLORS.bodyTextColor, borderWidth: 0.5, marginBottom: 15,
                                    textAlignVertical: 'top', color: theme.COLORS.bodyTextColor, height: 90,
                                }} value={notes.body} />
                        }

                        <TouchableOpacity disabled={updateButton} style={{ backgroundColor: theme.COLORS.primary, borderRadius: 10, alignSelf: 'flex-end', width: "35%", paddingVertical: 7, justifyContent: "center", alignItems: "center" }} onPress={() => { verifyWorkDetails() }}>
                            <Text style={{ color: theme.COLORS.white }}>Proceed</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
            </SafeAreaView>
            {openPhoto &&
                <View style={{ width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ top: windowHeight / 15, right: 20, alignSelf: "flex-end", zIndex: 10 }} onPress={() => setOpenPhoto(false)} >
                        <Image source={require('../assets/icons/cross.png')} style={{ width: 20, height: 20, tintColor: "white" }} />

                    </TouchableOpacity>
                    <PinchableImage uri={workDetails.companyIdPhoto} />
                </View>
            }
        </>
    )
}

export default Work_Info;