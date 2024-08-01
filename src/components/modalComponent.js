// ModalComponent.js
import React, { useState, useEffect } from 'react';
import '../styles/ModalComponent.css';

const ModalComponent = ({ notesModal, setNotesModal, handleData }) => {
    const [selectedOption, setSelectedOption] = useState("No");
    const windowWidth = window.innerWidth;
    const [note, setNote] = useState("");

    const notesModalHandler = () => setNotesModal(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const verifyData = () => {
        notesModalHandler(); // Close the modal
    };

    useEffect(() => {
        if (!notesModal) {
            handleData("");
            setSelectedOption("No");
        }
    }, [notesModal]);

    return (
        <div className={`overlay ${notesModal ? 'show' : ''}`}>
            <div className="overlay-background" onClick={notesModalHandler}></div>
            <div className="modal-content" style={{ top: selectedOption === "Yes" ? "40%" : '45%', left: '50%', transform: `translate(-50%, -25%)`, width: windowWidth - 40 }}>
                <h2 className="modal-title">Are you facing any issues?</h2>
                <div className="radio-group">
                    <label className="radio-option">
                        <input
                            type="radio"
                            checked={selectedOption === 'No'}
                            onChange={() => handleSelect("No")}
                        />
                        No
                    </label>
                    <label className="radio-option">
                        <input
                            type="radio"
                            checked={selectedOption === 'Yes'}
                            onChange={() => handleSelect("Yes")}
                        />
                        Yes
                    </label>
                </div>

                {selectedOption === "Yes" && (
                    <textarea
                        placeholder="Enter Your Notes..."
                        onChange={(e) => { handleData(e.target.value); setNote(e.target.value) }}
                        value={note}
                        className="notes-textarea"
                    />
                )}

                <button className="proceed-button" onClick={verifyData}>
                    Proceed
                </button>
            </div>
        </div>
    );
};

export default ModalComponent;