import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ReportSummary = ({ label, value, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col py-4 px-8 border-b border-gray-700">
            <Text className="text-white text-lg">{label}</Text>
            <Text className="text-secondary text-2xl">{value}</Text>
        </TouchableOpacity>
    );
};

export default ReportSummary;
