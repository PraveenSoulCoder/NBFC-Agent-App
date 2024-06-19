import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ShopCategoriesModal = ({ isVisible, onClose, data }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Shop Categories</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.category}
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{item.category}</Text>
                <View style={styles.subcategoryContainer}>
                  {item.subcategories.map((subcategory, index) => (
                    <Text key={index} style={styles.subcategoryText}>
                      {subcategory}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
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
    width: '80%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subcategoryContainer: {
    marginLeft: 10,
  },
  subcategoryText: {
    fontSize: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default ShopCategoriesModal;
