import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { icons } from '../constants';

const CustomModal = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="h-full w-full  items-center bg-black bg-opacity-50">
        <View className="bg-primary  rounded-lg ">
          <View className="flex-row justify-center items-center my-8 w-[100vw]">
            <TouchableOpacity className="absolute z-30 p-6 left-0 top-0" onPress={onClose}>
              <Image
                source={icons.leftArrow}
                resizeMode="contain"
                tintColor='white'
                className="w-6 h-6  "
              />
            </TouchableOpacity>
            <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
              {title}
            </Text>
          </View>
          <Text className="text-2xl px-8 font-semibold text-white mt-5 font-psemibold">
            History
          </Text>
          <ScrollView >
            <View className="py-4 px-16 flex-col ">
              {children}
            </View>
          </ScrollView>

        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
