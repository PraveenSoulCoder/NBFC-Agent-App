import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Animated, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorAlertModal = ({ isVisible, message, onClose }:any) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            { opacity: fadeAnim, transform: [{ scale: fadeAnim }] },
          ]}
        >
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    color: 'blue',
    fontSize: 16,
  },
});

export default ErrorAlertModal;
