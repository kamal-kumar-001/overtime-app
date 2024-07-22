import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton, FormField } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from "expo-router";
import { icons } from "../../../constants";

const Shifts = () => {
    const { user, shifts, setShifts } = useGlobalContext();
    const [isFormVisible, setFormVisible] = useState(false);
    const [form, setForm] = useState({
        shiftName: "Day",
        checkIn: new Date(new Date().setHours(9, 0, 0, 0)),
        checkOut: new Date(new Date().setHours(17, 0, 0, 0)),
    });

    const [isCheckInPickerVisible, setCheckInPickerVisibility] = useState(false);
    const [isCheckOutPickerVisible, setCheckOutPickerVisibility] = useState(false);

    useEffect(() => {
        const loadShifts = async () => {
            try {
                const storedShifts = await AsyncStorage.getItem('userShifts');
                if (storedShifts) {
                    setShifts(JSON.parse(storedShifts));
                }
            } catch (error) {
                console.error("Failed to load shifts from local storage:", error);
            }
        };

        loadShifts();
    }, []);

    const handleCheckInChange = (event, selectedDate) => {
        const currentDate = selectedDate || form.checkIn;
        setCheckInPickerVisibility(Platform.OS === 'ios');
        setForm({ ...form, checkIn: currentDate });
    };

    const handleCheckOutChange = (event, selectedDate) => {
        const currentDate = selectedDate || form.checkOut;
        setCheckOutPickerVisibility(Platform.OS === 'ios');
        setForm({ ...form, checkOut: currentDate });
    };

    const addShift = async () => {
        const { shiftName, checkIn, checkOut } = form;
        if (shiftName === "" || !checkIn || !checkOut) {
            Alert.alert("Error", "Please enter Shift name");
            return;
        }

        const newShift = { shiftName, checkIn, checkOut };
        const updatedShifts = [...shifts, newShift];
        setShifts(updatedShifts);

        try {
            await AsyncStorage.setItem('userShifts', JSON.stringify(updatedShifts));
        } catch (error) {
            console.error("Failed to save shifts to local storage:", error);
        }

        setForm({ shiftName: "", checkIn: new Date(new Date().setHours(9, 0, 0, 0)), checkOut: new Date(new Date().setHours(17, 0, 0, 0)) });
        setFormVisible(false);
    };

    const handleShiftDelete = async (name) => {
        const updatedShifts = shifts.filter(shift => shift.shiftName !== name);
        setShifts(updatedShifts);

        try {
            await AsyncStorage.setItem('userShifts', JSON.stringify(updatedShifts));
        } catch (error) {
            console.error("Failed to save shifts to local storage:", error);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="flex-row justify-center items-center my-4 px-4">
                <TouchableOpacity className="absolute z-30 left-6 top-6" onPress={() => router.back()}>
                    <Image
                        source={icons.leftArrow}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-6 h-6 "
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
                    Add Shifts
                </Text>
            </View>
            <ScrollView>
                <View
                    className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 150,
                    }}
                >
                    {!isFormVisible && (
                        <CustomButton
                            title="Add New Shift"
                            handlePress={() => setFormVisible(true)}
                            containerStyles="mt-7"
                        />
                    )}

                    {isFormVisible && (
                        <View>
                            <FormField
                                title="Shift Name"
                                value={form.shiftName}
                                handleChangeText={(e) => setForm({ ...form, shiftName: e })}
                                otherStyles="mt-7"
                            />

                            <View className="mt-7 space-y-2">
                                <Text className="text-base text-gray-100 font-pmedium">Check In Time</Text>
                                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
                                    <TouchableOpacity onPress={() => setCheckInPickerVisibility(true)}>
                                        <Text className="bg-black-100 p-4 py-2 font-psemibold rounded-lg text-white">{form.checkIn.toLocaleTimeString()}</Text>
                                    </TouchableOpacity>
                                    {isCheckInPickerVisible && (
                                        <DateTimePicker
                                            value={form.checkIn}
                                            mode="time"
                                            display="spinner"
                                            minuteInterval={5}
                                            onChange={handleCheckInChange}
                                        />
                                    )}
                                </View>
                            </View>

                            <View className="mt-7 space-y-2">
                                <Text className="text-base text-gray-100 font-pmedium">Check Out Time</Text>
                                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
                                    <TouchableOpacity onPress={() => setCheckOutPickerVisibility(true)}>
                                        <Text className="bg-black-100 font-psemibold p-4 py-2 rounded-lg text-white ">{form.checkOut.toLocaleTimeString()}</Text>
                                    </TouchableOpacity>
                                    {isCheckOutPickerVisible && (
                                        <DateTimePicker
                                            value={form.checkOut}
                                            mode="time"
                                            display="spinner"
                                            minuteInterval={5}
                                            onChange={handleCheckOutChange}
                                        />
                                    )}
                                </View>
                            </View>

                            <CustomButton
                                title="Save Shift"
                                handlePress={addShift}
                                containerStyles="mt-7"
                            />
                        </View>
                    )}

                    {shifts.length > 0 ? (
                        <View className="mt-7">
                            <Text className="text-base text-gray-100 font-pmedium">Shifts</Text>
                            {shifts.map((shift, index) => (
                                <View key={index} className="mt-2 p-4 bg-black-200 rounded-lg">
                                    <TouchableOpacity className="absolute z-30 right-4 top-4" onPress={() => handleShiftDelete(shift.shiftName)} >
                                        <Image
                                            source={icons.trash}
                                            resizeMode="contain"
                                            tintColor='white'
                                            className="w-6 h-6 "
                                        />
                                    </TouchableOpacity>
                                    <Text className="text-white font-psemibold">Shift Name: {shift.shiftName}</Text>
                                    <Text className="text-white font-psemibold">Check In: {new Date(shift.checkIn).toLocaleTimeString()}</Text>
                                    <Text className="text-white font-psemibold">Check Out: {new Date(shift.checkOut).toLocaleTimeString()}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text className="text-base text-gray-100 font-pmedium mt-7">No shifts available. Please add a new shift.</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Shifts;
