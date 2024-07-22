import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const LeaveSelector = ({ handleSetLeave }) => {
    return (
        <View className="mt-4">
            <Text className="text-white text-center mb-2">Select Leave Type</Text>
            {["Casual", "Emergency", "Sick"].map((type) => (
                <TouchableOpacity key={type} onPress={() => handleSetLeave(type)} className="mt-2 p-2 bg-black-200 rounded-lg">
                    <Text className="text-white text-center">{type}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default LeaveSelector;
