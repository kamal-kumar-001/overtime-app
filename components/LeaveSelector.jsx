import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../constants';

const LeaveSelector = ({ handleSetLeave }) => {
    const [selectedLeave, setSelectedLeave] = useState('Casual');

    const handleLeaveSelect = (leaveType) => {
        setSelectedLeave(leaveType);
    };

    return (
        <View className="my-4">
            <Text className="text-lg text-gray-100 font-pregular mb-2">Select Leave Type</Text>
            <View className="flex flex-row flex-wrap justify-between mb-4">
                <TouchableOpacity
                    className={`p-2 px-12 mb-4 flex flex-col items-center min-h-[150px] justify-center rounded-lg mr-2 ${selectedLeave === 'Casual' ? 'bg-blue-500' : 'bg-black-100'}`}
                    onPress={() => handleLeaveSelect('Casual')}
                >
                    <Image
                        source={icons.leave}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-16 h-16"
                    />
                    <Text className="text-white font-pregular py-2">Casual</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`p-2 px-12 mb-4 flex flex-col items-center min-h-[150px] justify-center rounded-lg mr-2 ${selectedLeave === 'Sick' ? 'bg-yellow-500' : 'bg-black-100'}`}
                    onPress={() => handleLeaveSelect('Sick')}
                >
                    <Image
                        source={icons.sick}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-16 h-16"
                    />
                    <Text className="text-white  font-pregular py-2">Sick</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`p-2  px-10 mb-4 flex flex-col items-center min-h-[150px] justify-center rounded-lg mr-2 ${selectedLeave === 'Emergency' ? 'bg-red-500' : 'bg-black-100'}`}
                    onPress={() => handleLeaveSelect('Emergency')}
                >
                    <Image
                        source={icons.emergencyicon}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-16 h-16"
                    />
                    <Text className="text-white font-pregular py-2">Emergency</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`p-2 px-12 mb-4 flex flex-col items-center min-h-[150px] justify-center rounded-lg mr-2 ${selectedLeave === 'Vacation' ? 'bg-green-500' : 'bg-black-100'}`}
                    onPress={() => handleLeaveSelect('Vacation')}
                >
                    <Image
                        source={icons.holiday}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-16 h-16"
                    />
                    <Text className="text-white font-pregular py-2">Vacation</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => handleSetLeave(selectedLeave)}
                activeOpacity={0.7}
                className={`rounded-xl bg-secondary min-h-[62px] flex flex-row justify-center items-center mt-4`}
            >
                <Text className={`font-psemibold text-lg text-white`}>
                    Set Leave {"   "}
                </Text>
                <Image
                    source={icons.leave}
                    resizeMode="contain"
                    tintColor='white'
                    className="w-6 h-6"
                />
            </TouchableOpacity>
        </View>
    );
};

export default LeaveSelector;
