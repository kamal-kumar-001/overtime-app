import React from 'react';
import { View, Text, Image } from 'react-native';
import { icons } from '../constants';

const StatusMessage = ({ message, type }) => {
    // Determine the icon based on the type
    let iconSource;
    switch (type) {
        case 'emergency':
            iconSource = icons.emergency;
            break;
        case 'getwell':
            iconSource = icons.getwell;
            break;
        case 'party':
            iconSource = icons.party;
            break;
        default:
            iconSource = icons.party; // or set a default icon if needed
            break;
    }

    return (
        <View className="my-12 items-center justify-center">
            <Image
                source={iconSource}
                className="max-w-[380px] w-full h-[298px]"
                resizeMode="contain"
            // tintColor="white"
            />
            <Text className="text-xl text-white my-8 font-pmedium text-center">{message}</Text>
        </View>
    );
};

export default StatusMessage;
