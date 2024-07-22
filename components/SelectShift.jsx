import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useGlobalContext } from "../context/GlobalProvider";

const ShiftSelect = () => {
    const { shifts } = useGlobalContext();
    const [selectedShift, setSelectedShift] = useState(null);

    const handleShiftSelect = (shift) => {
        setSelectedShift(shift);
    };

    return (
        <View className="mb-4">
            <Text className="text-lg text-gray-100 mb-2">Select Shift</Text>
            <View className="flex-row mb-4">
                {shifts?.map((shift, index) => (
                    <TouchableOpacity
                        key={index}
                        className={`p-2 rounded-lg mr-2 ${selectedShift?.shiftName === shift.shiftName ? 'bg-secondary' : 'bg-black-100'}`}
                        onPress={() => handleShiftSelect(shift)}
                    >
                        <Text className="text-white">{shift.shiftName}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {selectedShift && (
                <View>
                    <Text className="text-lg text-gray-100">Shift Times</Text>
                    <View className="mt-2">
                        <Text className="text-white">Check In: {new Date(selectedShift.checkIn).toLocaleTimeString()}</Text>
                        <Text className="text-white">Check Out: {new Date(selectedShift.checkOut).toLocaleTimeString()}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ShiftSelect;
