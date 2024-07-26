import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import CustomButton from './CustomButton'; // Ensure you import your CustomButton component

const Timer = ({ timer, isRunning, setTimer, handleCheckInOut }) => {
    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1000);
            }, 1000);
        } else if (!isRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, timer, setTimer]);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <View className="my-8 items-center justify-center">
            <View className="w-48 h-48 border-4 border-secondary rounded-full flex items-center justify-center">
                <Text className="text-4xl text-white">{formatTime(timer)}</Text>
            </View>
            <CustomButton
                title={isRunning ? "Check Out" : "Check In"}
                handlePress={handleCheckInOut}
                textStyles='text-white'
                containerStyles="mt-6 w-4/5 bg-secondary "
            />
        </View>
    );
};

export default Timer;
