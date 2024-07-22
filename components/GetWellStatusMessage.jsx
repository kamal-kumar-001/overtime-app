import React from 'react';
import { View, Text, Image } from 'react-native';
import { icons } from '../constants';

const GetWellStatusMessage = ({ message }) => (
    <View className="my-12 items-center justify-center">
        <Image
            source={icons.getwell}
            className="max-w-[380px] w-full h-[298px] "
            resizeMode="contain"
        />
        <Text className="text-xl text-white my-8 font-pmedium text-center">{message}</Text>
    </View>
);

export default GetWellStatusMessage;
