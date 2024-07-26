import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import OvertimeComponent from './OverTime';
import { icons } from '../constants';
import { router } from "expo-router";

const ShiftSelect = ({ shifts, handleCheckOut, handleAddOvertime }) => {
    const [selectedShift, setSelectedShift] = useState(null);
    const [overtime, setOvertime] = useState(false)
    const handleOvertime = () => {
        setOvertime(true)
    }

    useEffect(() => {
        if (shifts && shifts.length > 0) {
            setSelectedShift(shifts[0]);
        }
    }, [shifts]);

    const handleShiftSelect = (shift) => {
        setSelectedShift(shift);
    };

    return (
        <View className="mb-4">
            <Text className="text-lg text-gray-100 mb-2">{shifts.length > 0 ? "Select Shift" : "Please add Shift"}</Text>
            {shifts.length > 0 ? (<View className="flex-row mb-4">
                {shifts?.map((shift, index) => (
                    <TouchableOpacity
                        key={index}
                        className={`p-2 rounded-lg mr-2 ${selectedShift?.shiftName === shift.shiftName ? 'bg-secondary' : 'bg-black-100'}`}
                        onPress={() => handleShiftSelect(shift)}
                    >
                        <Text className="text-white font-pregular px-2">{shift.shiftName}</Text>
                    </TouchableOpacity>
                ))}
            </View>) : (
                <TouchableOpacity
                    onPress={() => router.replace('/setting/shifts')}
                    activeOpacity={0.7}
                    className={`rounded-xl bg-secondary min-h-[62px] flex flex-row justify-center items-center mt-4`}
                >
                    <Text className={`font-psemibold text-lg text-white`}>
                        Add Shifts
                    </Text>
                </TouchableOpacity>
            )}
            {selectedShift && (
                <View>
                    <Text className="text-lg text-gray-100">Shift Times</Text>
                    <View className="mt-2">
                        <Text className="text-white uppercase font-pmedium">Check In:{"       "} {new Date(selectedShift.checkIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                        <Text className="text-white uppercase font-pmedium">Check Out:{"   "} {new Date(selectedShift.checkOut).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                    </View>
                </View>
            )}

            {shifts.length > 0 ? (<TouchableOpacity
                onPress={() => handleCheckOut({ checkIn: selectedShift?.checkIn, checkOut: selectedShift?.checkOut })}
                activeOpacity={0.7}
                className={`rounded-xl bg-green-600 min-h-[62px] flex flex-row justify-center items-center mt-8`}
            >
                <Text className={`font-psemibold text-lg text-white`}>
                    CheckOut {"   "}
                </Text>
                <Image
                    source={icons.checkout}
                    resizeMode="contain"
                    tintColor='white'
                    className="w-6 h-6"
                />
            </TouchableOpacity>) : null}

            {overtime ? <OvertimeComponent selectedShift={selectedShift} handleAddOvertime={handleAddOvertime} /> : (

                <TouchableOpacity
                    onPress={handleOvertime}
                    activeOpacity={0.7}
                    className={`rounded-xl bg-green-800 min-h-[62px] flex flex-row justify-center items-center mt-8`}
                >
                    <Text className={`font-psemibold text-lg text-white`}>
                        Add Overtime{"   "}
                    </Text>
                    <Image
                        source={icons.uptime}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-6 h-6"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ShiftSelect;
