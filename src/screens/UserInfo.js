import React, { useEffect, useState } from "react";
import { ArrowLeftCircle, FiletypePdf } from "react-bootstrap-icons";
import '../styles/UserInfo.css'
import ModalComponent from "../components/modalComponent";

const UserInfo = ({ route }) => {

    const [userDetails, setUserDetails] = useState({})
    const [notesModal, setNotesModal] = useState(false);

    const [notes, setNotes] = useState({ subject: "User Information", body: "All the details are correct and verified" })


    // const verifyUser = (userDetails.houseLon && userDetails.houseLat)
    //     && (userDetails.housePhoto)
    //     && (userDetails.userPicture);

    useEffect(() => {
        if (route?.params?.fileUri) {
            console.log(route?.params?.fileUri)
            if (route?.params?.photoType == "house") {
                // setUserHousePhoto(route?.params?.fileUri)
                setUserDetails({ ...userDetails, housePhoto: route?.params?.fileUri })
            } else if (route?.params?.photoType == "profile") {
                // setUserProfilePhoto(route?.params?.fileUri)
                setUserDetails({ ...userDetails, userPicture: route?.params?.fileUri })
            }

            console.log("passRoute :", route?.params?.photoType)
            // }else if(route?.params?.type == "user"){
        } else {
            setUserDetails(route?.params?.data)
            console.log("userDetails", route?.params?.data.roleId)
        }
    }, [route]);

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {

        console.log(lat1)
        console.log(lon1)

        console.log(lat2)
        console.log(lon2)

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

    const handleModalData = (data) => {
        setNotes({ ...notes, body: data });
        console.log('Received data from modal:', notes.body);
    };

    // const isPdf = userDetails.utilityBillImgUrl.endsWith('.pdf');

    // const handlePress = () => {
    //     if (isPdf) {
    //         window.open(userDetails.utilityBillImgUrl, '_blank');
    //     }
    // };



    return (
        <div className="UserInfo-main">
            <div className="UserInfo-container">
                <div className="navbar-component">
                    <ArrowLeftCircle size={30} onClick={() => window.history.back()} />
                    <p>User Information</p>
                </div>
                <div className="UserInfo-details-container">

                    <div className="user-details-wrapper">
                        <label>User Name</label>
                        <p>John Doe</p>
                    </div>
                    <div className="user-details-wrapper">
                        <label>User Name</label>
                        <p>John Doe</p>
                    </div>
                    <div className="user-details-wrapper">
                        <label>User Name</label>
                        <p>John Doe</p>
                    </div>
                    <div className="user-details-wrapper">
                        <label>User Name</label>
                        <p>John Doe</p>
                    </div>
                    <div className="user-details-wrapper">
                        <label>User Name</label>
                        <p>John Doe</p>
                    </div>
                    <div className="user-details-wrapper">
                        <label>User Name</label>
                        <p>John Doe</p>
                    </div>

                    <div className="user-details-wrapper">
                        <label>User Utility Bill</label>
                        <div className="user-utility-bill-container">
                            <span className="user-utility-bill-type">Electricity Bill</span>
                            {true ?
                                <div className="user-utility-bill-pdf" onClick={()=>{}}>
                                    <FiletypePdf size={80} />
                                    <span className="user-utility-bill-pdf-text">Tap to View Pdf</span>
                                </div> :
                                <img src={"https://qph.cf2.quoracdn.net/main-qimg-407c76166a1b4372cd33d389e713bb59-lq"} alt="utility bill" />
                            }
                        </div>
                    </div>


                </div>

                <div className="Verification-submit-container">
                    <button className="Home-Verification-submit">
                        {/* {userDetails.houseLat && userDetails.houseLon && userDetails.userPicture && userDetails.housePhoto ? "Update" : "Verify"} */}
                        Verify
                    </button>
                </div>
            </div>
            <ModalComponent notesModal={notesModal} setNotesModal={setNotesModal} handleData={handleModalData} />

        </div>
    )
}

export default UserInfo