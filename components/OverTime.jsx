import React, { useState } from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from './CustomButton'; // Assuming you have a CustomButton component
import { useGlobalContext } from "../context/GlobalProvider";

const OvertimeComponent = ({ handleAddOvertime }) => {
    const { setOvertime } = useGlobalContext();
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date(new Date().setHours(2, 0, 0, 0)));

    const onTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || selectedTime;
        setShowTimePicker(Platform.OS === 'ios');
        currentDate.setSeconds(0);
        setSelectedTime(currentDate);
    };

    const handleConfirm = () => {
        setOvertime(selectedTime);
        handleAddOvertime(selectedTime);
        setShowTimePicker(false); // Hide the time picker after confirming
    };

    const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker);
    };

    return (
        <View className="py-4">
            <Text className="text-base py-1 text-gray-100 font-pmedium">
                Overtime
            </Text>
            <TouchableOpacity className="bg-black-100 py-2 px-4  rounded-2xl border-2 border-black-200" onPress={toggleTimePicker}>
                <Text className="bg-black-100 p-4 py-2 font-psemibold rounded-lg text-white">
                    {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} {"   "}Hours
                </Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="spinner"
                    onChange={onTimeChange}
                    minuteInterval={5} // Set the minute interval to 5 minutes
                    is24Hour={true} // Use 24-hour format to remove AM/PM
                />
            )}
            <CustomButton
                title="Set Overtime"
                handlePress={handleConfirm}
                textStyles='text-white'
                containerStyles="mt-4"
            />
        </View>
    );
};

export default OvertimeComponent;
