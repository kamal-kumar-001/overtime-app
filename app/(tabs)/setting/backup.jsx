import React from 'react';
import { View, Text, Share, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';


const Backup = () => {

    const shareApp = async () => {
        try {
            await Share.share({
                message: 'Hey! 🎉 Check out Overtime App, the ultimate app to effortlessly manage your overtime, leaves, holidays, and shifts. 🚀 Join the community and stay on top of your schedule. Download now and share with friends: https://play.google.com/store/apps/details?id=kamal.dev',
            });
        } catch (error) {
            console.error('Error sharing the app:', error.message);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <TouchableOpacity className="absolute z-30 py-10 px-2 left-6 top-6" onPress={() => router.back()}>
                <Image
                    source={icons.leftArrow}
                    resizeMode="contain"
                    tintColor='white'
                    className="w-6 h-6 "
                />
            </TouchableOpacity>
            <View className='flex-1 justify-center items-center p-4'>
                <Text className='text-white text-2xl text-center font-psemibold'>
                    Backup Feature Coming Soon!
                </Text>
                <Text className='text-white font-pregular my-4 text-lg text-center'>
                    FREE Backup Feature is on the horizon, exclusively for our amazing users! 🎉 Once our community grows to 10,000 downloads, you’ll be able to securely back up your data, including overtime hours, leaves, holidays, and shifts. 📊

                    Help us reach this milestone faster! Share the app with your friends and colleagues, and be a part of our journey to make time management effortless for everyone. 🚀

                    Stay tuned and spread the word! 🔄
                </Text>
                <TouchableOpacity className="p-4 rounded-xl bg-secondary  flex-row items-center" onPress={shareApp}>
                    <Text className="text-white text-lg mr-4 font-psemibold">Share with Friends</Text>
                    <Image
                        source={icons.share}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-6 h-6"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Backup;
