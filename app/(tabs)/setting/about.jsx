import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../../constants';
import { router } from "expo-router";
const AboutApp = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };
  return (
    <SafeAreaView className="bg-primary h-full ">
      <View className="flex-row justify-center items-center my-6">
        <TouchableOpacity className="absolute z-30 left-6 " onPress={() => router.back()}>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            tintColor='white'
            className="w-6 h-6 "
          />
        </TouchableOpacity>
        <Text className="text-white text-2xl text-center font-psemibold ">About the Overtime</Text>
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className=" justify-center px-8 py-8 mb-8">
          <Text className="text-white font-pregular mb-4">
            Welcome to our employee management app, designed to streamline and simplify your work life.
          </Text>
          <Text className="text-white text-lg font-psemibold mb-2">Functionalities and Features</Text>
          <Text className="text-white font-pregular mb-2">
            <Text className="font-psemibold">Home Page: </Text>
            After login or guest access, the home page includes:
          </Text>
          <Text className="text-white font-pregular mb-2">
            • <Text className="font-psemibold">Overtime Records: </Text>
            View and log overtime hours.
          </Text>
          <Text className="text-white font-pregular mb-2">
            • <Text className="font-psemibold">Leave Records: </Text>
            View and request different types of leave.
          </Text>
          <Text className="text-white font-pregular mb-2">
            • <Text className="font-psemibold">Upcoming Holidays: </Text>
            Calendar view of upcoming holidays.
          </Text>
          <Text className="text-white font-pregular mb-2">
            • <Text className="font-psemibold">Check-in/Checkout: </Text>
            Button for recording check-in and checkout times.
          </Text>
          <Text className="text-white font-pregular mb-2">
            • <Text className="font-psemibold">Shift Management: </Text>
            Manage shifts and view shift schedules.
          </Text>
          <Text className="text-white font-pregular mb-2">
            • <Text className="font-psemibold">Vacation Planning: </Text>
            Plan and request vacations.
          </Text>
          <Text className="text-white font-pregular mb-4">
            <Text className="font-psemibold">Additional Considerations: </Text>
            The app also includes notifications for reminders for check-in/checkout, upcoming holidays, and shift changes.
          </Text>
          <Text className="text-white text-lg font-psemibold mb-2">About the Creator</Text>
          <Text className="text-white font-pregular mb-4">
            This app was created by Kamal. Connect with Kamal:
          </Text>
          <View className="flex-row justify-between px-8">
            <TouchableOpacity className="px-4 py-2 rounded-xl bg-secondary"
              onPress={() => openLink('https://www.linkedin.com/in/kamal-profile')} >
              <Image
                source={icons.linkedin}
                resizeMode="contain"
                // tintColor='white'
                className="w-6 h-6 "
              />
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-xl bg-secondary"
              onPress={() => openLink('mailto:kamal@example.com')}  >
              <Image
                source={icons.mail}
                resizeMode="contain"
                tintColor='white'
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 rounded-xl bg-secondary"
              onPress={() => openLink('https://github.com/kamal-profile')} >
              <Image
                source={icons.github}
                resizeMode="contain"
                tintColor='white'
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutApp;
