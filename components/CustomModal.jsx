import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const CustomModal = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-primary p-6 rounded-lg w-3/4">
          <Text className="text-white text-xl mb-4">{title}</Text>
          <ScrollView>{children}</ScrollView>
          <TouchableOpacity onPress={onClose} className="mt-4 p-4 bg-secondary rounded-lg">
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
