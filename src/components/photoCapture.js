// src/components/CameraComponent.js
import React, { useRef, useState, useEffect } from 'react';

const CameraComponent = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [photoUrl, setPhotoUrl] = useState(null);

    const startCamera = async () => {
        try {
            const constraints = {
                video: {
                    facingMode: { exact: 'environment' }, // Use the back camera
                    width: { ideal: 1920 }, // Increase width for higher resolution
                    height: { ideal: 1080 } // Increase height for higher resolution
                }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // Wait for the video metadata to be loaded before playing
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play().catch((error) => {
                        console.error('Error playing the video:', error);
                    });
                };
            }
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };

    useEffect(() => {
        startCamera();
        return () => {
            const stream = videoRef.current?.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const takeSnapshot = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            setPhotoUrl(canvas.toDataURL('image/jpeg'));
        }
    };

    const closePhoto = () => {
        setPhotoUrl(null);
        startCamera(); // Restart the camera
    };

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button onClick={takeSnapshot}>Take Photo</button>
            {photoUrl && (
                <div>
                    <img src={photoUrl} alt="Captured" style={{ width: '100%' }} />
                    <button onClick={closePhoto}>Close Photo</button>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;
