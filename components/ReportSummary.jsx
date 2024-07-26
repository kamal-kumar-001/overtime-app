import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const ReportSummary = ({ label, value, icon, onPress }) => {
    return (
        <View className="flex min-h-[150px] flex-row justify-between items-center py-4 px-4 border-b border-gray-700">
            <View className="flex flex-col justify-center items-center">
                <Image
                    source={icon}
                    resizeMode="contain"
                    tintColor='white'
                    className="w-16 h-16"
                />
                <Text className="text-white font-pregular text-xl py-2">{label}</Text>
            </View>
            <View className=" flex flex-col justify-center items-center">
                <Text className="text-secondary text-3xl py-4">{value}</Text>
                <TouchableOpacity onPress={onPress} className="bg-secondary h-10  rounded-xl">
                    <Text className="text-white text-xl text-center px-4 py-1 ">Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ReportSummary;
