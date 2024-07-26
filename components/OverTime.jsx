import React, { useState, useEffect } from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from './CustomButton';

const OvertimeComponent = ({ handleAddOvertime, selectedShift, checkOutTime }) => {
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    useEffect(() => {
        if (selectedShift?.checkOut) {
            setStartTime(new Date(selectedShift.checkOut));
        }
        if (checkOutTime) {
            setEndTime(new Date(checkOutTime));
        }
    }, [selectedShift, checkOutTime]);

    const onStartTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || startTime;
        setShowStartPicker(Platform.OS === 'ios');
        currentDate.setSeconds(0);
        setStartTime(currentDate);
    };

    const onEndTimeChange = (event, selectedDate) => {
        const currentDate = selectedDate || endTime;
        setShowEndPicker(Platform.OS === 'ios');
        currentDate.setSeconds(0);
        setEndTime(currentDate);
    };

    const formatDuration = (duration) => {
        const hours = Math.floor(duration);
        const minutes = Math.round((duration - hours) * 60);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    const handleConfirm = () => {
        const overtimeDuration = formatDuration((endTime - startTime) / (1000 * 60 * 60));
        handleAddOvertime({
            startTime,
            endTime,
            duration: overtimeDuration,
            checkInTime: selectedShift?.checkIn,
            checkOutTime: selectedShift?.checkOut,
        });
        setShowStartPicker(false);
        setShowEndPicker(false);
    };

    const toggleStartPicker = () => {
        setShowStartPicker(!showStartPicker);
    };

    const toggleEndPicker = () => {
        setShowEndPicker(!showEndPicker);
    };

    return (
        <View className="py-4">
            <Text className="text-base py-1 text-gray-100 font-pmedium">Overtime</Text>
            <View className="flex-row justify-evenly items-center">
                <View className="mt-4">
                    <Text className="text-base text-gray-100 font-pmedium">Start</Text>
                    <TouchableOpacity
                        className="bg-black-100 px-4 rounded-2xl border-2 border-black-200"
                        onPress={toggleStartPicker}
                    >
                        <Text className="bg-black-100 uppercase p-4 py-4 font-psemibold rounded-lg text-white">
                            {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </TouchableOpacity>
                    {showStartPicker && (
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            display="spinner"
                            onChange={onStartTimeChange}
                            minuteInterval={5} // Set the minute interval to 5 minutes
                        />
                    )}
                </View>
                <View className="mt-4">
                    <Text className="text-base text-gray-100 font-pmedium">End</Text>
                    <TouchableOpacity
                        className="bg-black-100 px-4 rounded-2xl border-2 border-black-200"
                        onPress={toggleEndPicker}
                    >
                        <Text className="bg-black-100 uppercase p-4 py-4 font-psemibold rounded-lg text-white">
                            {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </TouchableOpacity>
                    {showEndPicker && (
                        <DateTimePicker
                            value={endTime}
                            mode="time"
                            display="spinner"
                            onChange={onEndTimeChange}
                            minuteInterval={5} // Set the minute interval to 5 minutes
                        />
                    )}
                </View>
            </View>
            <CustomButton
                title="Add"
                handlePress={handleConfirm}
                textStyles="text-white"
                containerStyles="mt-4 bg-secondary"
            />
        </View>
    );
};

export default OvertimeComponent;
