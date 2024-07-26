import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, ScrollView, Dimensions, Alert, TouchableOpacity, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton, FormField } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from "expo-router";
import { icons } from "../../../constants";

const Profile = () => {
    const { user, setUser } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        company: "",
    });
    useEffect(() => {
        if (user) {
            setForm({
                ...form,
                name: user.name,
                phone: user.phone,
                company: user.company,
            });
        }
    }, [user]);

    const submit = async () => {
        const { token } = user;
        const userData = { ...form, token };
        // console.log(userData);
        setSubmitting(true);
        try {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
            router.replace("/home");
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="flex-row justify-center items-center my-4">
                <TouchableOpacity className="absolute z-30 left-6 top-6" onPress={() => router.back()}>
                    <Image
                        source={icons.leftArrow}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-6 h-6 "
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-semibold text-white mt-5 font-psemibold">
                    Profile
                </Text>
            </View>
            <ScrollView>
                <View
                    className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get("window").height - 400,
                    }}
                >
                    <FormField
                        title="Name"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        otherStyles="mt-10"
                    />
                    {/* <FormField
                        title="Phone"
                        // disabled
                        value={form.phone}
                        keyboardType="phone-pad"
                        // handleChangeText={(e) => setForm({ ...form, phone: e })}
                        otherStyles="mt-7"
                    /> */}
                    <View className={`space-y-2 mt-7`}>
                        <Text className="text-base text-gray-100 font-pmedium">Phone</Text>

                        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
                            <TextInput
                                disabled
                                editable={false}
                                className="flex-1 text-white font-psemibold text-base"
                                value={form.phone}
                            //   onChangeText={(e) => setForm({ ...form, phone: e })}
                            />
                            <Image
                                source={icons.verify}
                                className="w-6 h-6 "
                                resizeMode="contain"
                                tintColor='white'
                            />
                        </View>
                    </View>
                    <FormField
                        title="Company Name"
                        value={form.company}
                        handleChangeText={(e) => setForm({ ...form, company: e })}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Save"
                        handlePress={submit}
                        containerStyles="mt-7 bg-secondary "
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
