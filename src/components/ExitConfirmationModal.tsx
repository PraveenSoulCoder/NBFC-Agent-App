import React, { useState, useEffect } from 'react';
import { BackHandler, ToastAndroid, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Custom hook to handle single and double tap back press
export const useBackHandler = () => {
  const [lastBackPress, setLastBackPress] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      const currentTime = Date.now();
      if (currentTime - lastBackPress < 2000) {
        // If the time difference between the current and last back press is less than 2 seconds, exit the app
        BackHandler.exitApp();
        return true; // Prevent default back press behavior
      } else {
        // Otherwise, it's a single tap, update last back press time and show a toast message
        setLastBackPress(currentTime);
        ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        return true; // Prevent default back press behavior
      }
    });

    return () => {
      backHandler.remove(); // Clean up event listener
    };
  }, [lastBackPress]);

  return null; // This hook doesn't render anything, it just handles back press events
};
