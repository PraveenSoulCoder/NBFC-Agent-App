import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { Check2Circle, PersonCircle, PersonExclamation, PersonVcard } from "react-bootstrap-icons";

const Home = ({ route }) => {
    const [searchPhone, setSearchPhone] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [workDetails, setWorkDetails] = useState({});
    const [roleId, setRoleId] = useState("AG1719396582446");
    const [apiKey, setApiKey] = useState("M2hZZytlZU1vL3h0aWR2TXVoOUFhdTV1RmNRaWVnaGYxZ0Vpb0hBVmFKbz");
    const [userFound, setUserFound] = useState(false);

    const submit = (
        !userDetails.houseLon || userDetails.houseLon.length <= 0 ||
        !userDetails.houseLat || userDetails.houseLat.length <= 0 ||
        !userDetails.housePhoto || userDetails.housePhoto.length <= 0 ||
        !userDetails.userPicture || userDetails.userPicture.length <= 0 ||
        !workDetails.companyLon || workDetails.companyLon.length <= 0 ||
        !workDetails.companyLat || workDetails.companyLat.length <= 0 ||
        !workDetails.companyPhoto || workDetails.companyPhoto.length <= 0 ||
        !userDetails.panPhoto || userDetails.panPhoto.length <= 0 ||
        !userDetails.aadhaarPhoto || userDetails.aadhaarPhoto.length <= 0
    );


    useEffect(() => {
        console.log("route listener is working")
        if (searchPhone.length === 10) {
            getDetails();
        }
    }, [searchPhone, route]);

    const getDetails = async () => {
        console.log("parameters :", roleId, searchPhone, apiKey)
        try {
            if (searchPhone !== null && searchPhone !== undefined && searchPhone.length == 10) {
                await fetch(`http://192.168.1.22:6500/business/getAgentVerifyLoans`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        "roleId": roleId,
                        "userPhone": searchPhone,
                        "apiKey": apiKey
                    })
                })
                    .then((response) => response.json())
                    .then(async (responseData) => {

                        if (responseData.Success) {
                            console.log("Response data of get details is working", responseData)

                            const extractedUserDetails = {
                                currentCity: responseData.Success.currentCity,
                                currentCountry: responseData.Success.currentCountry,
                                currentDistrict: responseData.Success.currentDistrict,
                                currentHouseNo: responseData.Success.currentHouseNo,
                                currentLandmark: responseData.Success.currentLandmark,
                                currentPincode: responseData.Success.currentPincode,
                                currentState: responseData.Success.currentState,
                                currentStreet: responseData.Success.currentStreet,
                                loanStatus: responseData.Success.loanStatus,
                                passcode: responseData.Success.passcode,
                                permanentCity: responseData.Success.permanentCity,
                                permanentCountry: responseData.Success.permanentCountry,
                                permanentDistrict: responseData.Success.permanentDistrict,
                                permanentHouseNo: responseData.Success.permanentHouseNo,
                                permanentLandmark: responseData.Success.permanentLandmark,
                                permanentPincode: responseData.Success.permanentPincode,
                                permanentState: responseData.Success.permanentState,
                                permanentStreet: responseData.Success.permanentStreet,
                                userAge: responseData.Success.userAge,
                                userBloodGroup: responseData.Success.userBloodGroup,
                                userCommunity: responseData.Success.userCommunity,
                                userDOB: responseData.Success.userDOB,
                                userEducation: responseData.Success.userEducation,
                                userEmail: responseData.Success.userEmail,
                                userEmailVerified: responseData.Success.userEmailVerified,
                                userFatherName: responseData.Success.userFatherName,
                                userGST: responseData.Success.userGST,
                                userGender: responseData.Success.userGender,
                                userLatitude: responseData.Success.userLatitude,
                                userLongitude: responseData.Success.userLongitude,
                                userMaritalStatus: responseData.Success.userMaritalStatus,
                                userMotherName: responseData.Success.userMotherName,
                                userName: "Manish",  // This value is base64 encoded in the original JSON and should be decoded.
                                userNationality: responseData.Success.userNationality,
                                userPhone: responseData.Success.userPhone,
                                userProfilePic: responseData.Success.userProfilePic,
                                userResidentialOwnerShip: responseData.Success.userResidentialOwnerShip,
                                utilityBillImgUrl: responseData.Success.utilityBillImgUrl,
                                utilityBillType: responseData.Success.utilityBillType,
                                loanId: responseData.Success.loanId,
                                roleId: roleId,
                                userPicture: responseData.Success.userPicture,
                                housePhoto: responseData.Success.housePhoto,
                                houseLon: responseData.Success.houseLon,
                                houseLat: responseData.Success.houseLat,
                                aadhaarPhoto: responseData.Success.aadhaarPhoto,
                                panPhoto: responseData.Success.panPhoto,
                                userPicture: responseData.Success.userPicture,
                                userLatitude: responseData.Success.userLatitude,
                                userLongitude: responseData.Success.userLongitude,
                                agreementPhoto: responseData.Success.agreementPhoto,
                                no: searchPhone
                            };
                            setUserDetails(extractedUserDetails);

                            const extractedWorkDetails = {
                                companyName: responseData.Success.companyName,
                                companyCity: responseData.Success.companyCity,
                                companyCountry: responseData.Success.companyCountry,
                                companyDesignation: responseData.Success.companyDesignation,
                                companyDistrict: responseData.Success.companyDistrict,
                                companyEmail: responseData.Success.companyEmail,
                                companyEmployeeId: responseData.Success.companyEmployeeId,
                                companyIdPhoto: responseData.Success.companyIdPhoto,
                                companyJoinDate: responseData.Success.companyJoinDate,
                                companyJoiningLetter: responseData.Success.companyJoiningLetter,
                                companyLandmark: responseData.Success.companyLandmark,
                                companyLat: responseData.Success.companyLat,
                                companyLatitude: responseData.Success.companyLatitude,
                                companyLon: responseData.Success.companyLon,
                                companyLongitude: responseData.Success.companyLongitude,
                                companyPhoto: responseData.Success.companyPhoto,
                                companyPincode: responseData.Success.companyPincode,
                                companySalary: responseData.Success.companySalary,
                                companyState: responseData.Success.companyState,
                                companyStreet: responseData.Success.companyStreet,
                                companyTotalExp: responseData.Success.companyTotalExp,
                                companyType: responseData.Success.companyType,
                                loanId: responseData.Success.loanId,
                                roleId: roleId,
                                no: searchPhone

                            }
                            setWorkDetails(extractedWorkDetails);
                            setUserFound(true);

                        } else {
                            setUserFound(false);
                        }
                    }).catch(err => console.log(err))
            }
        } catch (err) {
            console.log("Error in Home.js", err)
        }
    }

    return (
        <div className="Home-main">
            <div className="Home-container">
                <div className="Home-nav">
                    <PersonCircle size={40} />
                    <p>Welcome User Name</p>
                </div>
                <div className="Home-input-container">
                    <label className="Home-input-label">Search By Phone</label>
                    <input type="text" className="Home-input" placeholder="Enter Phone Number" maxLength={10} onChange={(e) => setSearchPhone(e.target.value)} />
                </div>
                <div className="Home-Verification-container">
                    <div className="Home-Verification-wrapper">
                        <p className="Home-Verification-heading">Verification Process</p>
                        {userFound || true ?
                            <>
                                <div className="Home-Verification-check-container">
                                    <div className="Home-Verification-checks">
                                        <div className="Home-Verification-content">
                                            <PersonVcard size={20}/>
                                            <p>User Details</p>
                                        </div>
                                        <Check2Circle size={35} />

                                    </div>
                                </div>

                                <button></button>
                            </> :
                            <p>no data</p>

                        }
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Home;