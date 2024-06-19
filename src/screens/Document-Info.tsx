import { ScrollView, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { theme } from "../constants/theme";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import RadioButton from "../components/RadioButton";
import PermissionModal from "../components/PermissionModal";
import { Camera } from 'expo-camera';
import PinchableImage from "../components/PinchableImage";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Document_Info = ({ navigation, route }: { navigation: any, route: any }) => {

    const [documentDetails, setDocumentDetails] = useState({})
    const [notesModal, setNotesModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState("No");

    const [permissionModal, setPermissionModal] = useState(false);
    const [permissionType, setPermissionType] = useState('');

    const [openPhoto, setOpenPhoto] = useState(false)
    const [selectedPhoto, setSelectedPhoto] = useState()

    const [notes, setNotes] = useState({ subject: "Document Information", body: "All the details are correct and verified" })
    const hasAgreementPhoto = documentDetails.agreementPhoto && Array.isArray(documentDetails.agreementPhoto) && documentDetails.agreementPhoto.length > 0;



    const verifyDocument = (documentDetails.aadhaarPhoto) && (documentDetails.panPhoto) && (documentDetails.agreementPhoto);


    useEffect(() => {
        if (route?.params?.fileUri) {
            console.log(route?.params?.fileUri)
            if (route?.params?.photoType == "pan") {
                setDocumentDetails({ ...documentDetails, panPhoto: route?.params?.fileUri })
            } else if (route?.params?.photoType == "aadhar") {
                setDocumentDetails({ ...documentDetails, aadhaarPhoto: route?.params?.fileUri })
            } else if (route?.params?.photoType == "agreement") {
                // setDocumentDetails({ ...documentDetails, agreementPhoto: route?.params?.fileUri })
                console.log("agreementPhoto", route?.params?.fileUri)
                setDocumentDetails({
                    ...documentDetails,
                    agreementPhoto: [...(documentDetails.agreementPhoto || []), route?.params?.fileUri]
                });

            }
        } else {
            setDocumentDetails(route?.params?.data)
        }
    }, [route]);

    const verifyDocuments = async () => {
        console.log("payload of the :", {
            apiKey: "M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz",
            roleId: documentDetails?.roleId,
            loanId: documentDetails?.loanId,
            aadhaarPhoto: documentDetails?.aadhaarPhoto,
            panPhoto: documentDetails?.panPhoto,
            agreementPhoto: documentDetails?.agreementPhoto,
            subject: notes.subject,
            body: notes.body,
        })

        try {
            const apiKey = await AsyncStorage.getItem('apikey');
            if (apiKey !== null && notes.subject !== null && notes.body !== null && documentDetails?.aadhaarPhoto && documentDetails?.panPhoto && documentDetails?.agreementPhoto) {
                await fetch(`http://192.168.1.22:6500/business/updateAgentVerify`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        apiKey: "M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz",
                        roleId: documentDetails?.roleId,
                        loanId: documentDetails?.loanId,
                        aadhaarPhoto: documentDetails?.aadhaarPhoto,
                        panPhoto: documentDetails?.panPhoto,
                        agreementPhoto: documentDetails?.agreementPhoto,
                        subject: notes.subject,
                        body: notes.body,
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log("Response of the verify details of the user:", responseData)
                        if (responseData.Success) {
                            navigation.navigate("Home1", { no: documentDetails.no })
                        }
                    })
            }
        } catch (e) {
            console.log("Error", e);
        }
    }

    const notesModalHandler = () => {
        setNotesModal(!notesModal)
    }

    const getCameraPermission = async (type) => {

        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log("Camera permission", status);

        if (status !== "granted") {
            openModal('Camera');
        } else {
            if (type == "panPhoto") {
                navigation.navigate("FileCapture", { "screenName": "doc-info", "action": "userPan_" + documentDetails.loanId + "", photoType: "pan" })
            } else if (type == "aadharPhoto") {
                navigation.navigate("FileCapture", { "screenName": "doc-info", "action": "userAadhar_" + documentDetails.loanId + "", photoType: "aadhar" })
            } else if (type == "agreementPhoto") {
                navigation.navigate("FileCapture", { "screenName": "doc-info", "action": "userAgreement_" + documentDetails.loanId + "", photoType: "agreement" })
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

    const handleSelect = (label: string) => {
        if (label == "No") {
            setNotes({ ...notes, body: "All the details are correct and verified" })
        } else {
            setNotes({ ...notes, body: "" })
        }
        setSelectedOption(label);
    };

    const removeAgreementPhoto = (index) => {
        setDocumentDetails((prevDetails) => {
            const updatedPhotos = prevDetails.agreementPhoto.filter((_, i) => i !== index);
            return { ...prevDetails, agreementPhoto: updatedPhotos };
        });
    };

    const photoOpen = (img) => {
        setSelectedPhoto(img)
        setOpenPhoto(true)
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.secondary }}>
                <Header goBack={true} goBackColor={theme.COLORS.white} titleStyle={{ color: theme.COLORS.white, }} containerStyle={{ backgroundColor: theme.COLORS.primary, height: windowHeight / 9, borderBottomEndRadius: 25, borderBottomStartRadius: 25 }} title="Documents" />
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: windowWidth - 20, height: windowHeight, alignSelf: "center", paddingVertical: 25, paddingHorizontal: 20, backgroundColor: theme.COLORS.white, marginTop: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Pan Photo </Text>
                        <TouchableOpacity onPress={() => getCameraPermission("panPhoto")} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Pan Image</Text>
                            {documentDetails?.panPhoto ?

                                <Image source={{ uri: documentDetails?.panPhoto }} style={{ width: "100%", height: 200, objectFit: "contain" }} /> :
                                <View style={{ width: "100%", height: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                    <Image source={require('../assets/icons/camera.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, }} />
                                    <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Take Photo</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>User Aadhar Photo </Text>
                        <TouchableOpacity onPress={() => getCameraPermission("aadharPhoto")} style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Aadhar Image</Text>
                            {documentDetails.aadhaarPhoto ?
                                <Image source={{ uri: documentDetails.aadhaarPhoto }} style={{ width: "100%", height: 200, objectFit: "contain" }} /> :
                                <View style={{ width: "100%", height: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                    <Image source={require('../assets/icons/camera.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, }} />
                                    <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Take Photo</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ ...theme.FONTS.Mulish_600SemiBold }}>Aggreement Photo </Text>
                        <View style={{ width: "100%", color: theme.COLORS.bodyTextColor, overflow: "hidden", backgroundColor: theme.COLORS.white, borderRadius: 10, marginTop: 10, borderWidth: 0.5, borderColor: theme.COLORS.primary }}>
                            <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary }}>Aggreement Image</Text>
                            {console.log("has agreement :", documentDetails.agreementPhoto)}
                            {hasAgreementPhoto ?
                                // {console.log("has agreement :",documentDetails.agreementPhoto)}?
                                <>
                                    <View style={{ flex: 1, flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center", width: "100%", flexWrap: "wrap" }}>
                                        {documentDetails.agreementPhoto.map((item, index) => {
                                            return (
                                                <TouchableOpacity onPress={() => photoOpen(item)} key={index} style={{ width: "30%", height: 110, justifyContent: "center", position: "relative", marginTop: 20 }}>
                                                    <Image key={index} source={{ uri: item }} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 10 }} />
                                                    <TouchableOpacity style={{ position: "absolute", top: -3, right: -3 }} onPress={() => removeAgreementPhoto(index)}>
                                                        <Image source={require('../assets/icons/remove.png')} style={{ width: 20, height: 20, }} />
                                                    </TouchableOpacity>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                    <TouchableOpacity onPress={() => getCameraPermission("agreementPhoto")}>
                                        <Text style={{ textAlign: "center", padding: 8, borderRadius: 10, margin: 10, ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.white, backgroundColor: theme.COLORS.primary, marginTop: 10, width: "50%", alignSelf: "flex-end", fontSize: 12 }}>Add More Page</Text>
                                    </TouchableOpacity>
                                </>
                                :

                                <TouchableOpacity onPress={() => getCameraPermission("agreementPhoto")} style={{ width: "100%", height: 150, justifyContent: "center", alignItems: "center", backgroundColor: theme.COLORS.secondary }}>
                                    <Image source={require('../assets/icons/camera.png')} style={{ width: 50, height: 50, objectFit: "contain", marginBottom: 10, }} />
                                    <Text style={{ ...theme.FONTS.Mulish_700Bold, color: theme.COLORS.bodyTextColor }}>Take Photo</Text>
                                </TouchableOpacity>
                            }
                        </View>

                    </View>


                    <TouchableOpacity disabled={!verifyDocument} style={{ backgroundColor: theme.COLORS.primary, opacity: verifyDocument ? 1 : 0.5, borderRadius: 15, alignSelf: 'flex-end', width: "50%", marginBottom: 20, paddingVertical: 7 }} onPress={notesModalHandler}>
                        <Text style={{ textAlign: "center", padding: 8, ...theme.FONTS.Mulish_700Bold, fontSize: 20, color: theme.COLORS.white }}>{documentDetails.panPhoto && documentDetails.aadhaarPhoto ? "Update" : "Verify"}</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: 15 }}>

                    </View>

                    <PermissionModal permissionContent={permissionType} visible={permissionModal} closeModal={closeModal} />


                </ScrollView >



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

                        <TouchableOpacity style={{ backgroundColor: theme.COLORS.primary, borderRadius: 10, alignSelf: 'flex-end', width: "35%", paddingVertical: 7, justifyContent: "center", alignItems: "center" }} onPress={() => { verifyDocuments() }}>
                            <Text style={{ color: theme.COLORS.white }}>Proceed</Text>
                        </TouchableOpacity>

                    </View>
                </Modal>
            </SafeAreaView >
            {openPhoto &&
                <View style={{ width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={{ top: windowHeight / 15, right: 20, alignSelf: "flex-end", zIndex: 10 }} onPress={() => setOpenPhoto(false)} >
                        <Image source={require('../assets/icons/cross.png')} style={{ width: 20, height: 20, tintColor: "white" }} />

                    </TouchableOpacity>
                    <PinchableImage uri={selectedPhoto} />
                </View>
            }
        </>
    )
}

export default Document_Info;