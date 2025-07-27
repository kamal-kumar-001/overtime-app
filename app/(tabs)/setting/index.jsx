import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, Modal, Linking, Share, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from "../../../context/GlobalProvider";
import { router } from "expo-router";
import { icons } from '../../../constants';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import PushNotification from 'react-native-push-notification';

const Settings = () => {
  const { user, setUser } = useGlobalContext();
  const [isModalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // const [isDarkTheme, setDarkTheme] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const fetchDayOffFromLocalStorage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('selectedDaysOff');
        if (storedData) {
          setSelectedDays(JSON.parse(storedData));
        }
      } catch (error) {
        console.error("Error fetching day off data from local storage:", error);
      }
    };

    fetchDayOffFromLocalStorage();
  }, []);

  const handleRateApp = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=kamal.dev');
  };
  const handleSuggestions = () => {
    const email = 'mrkamal0120@gmail.com';
    const subject = 'App Suggestion';
    const body = 'Hi, I have a suggestion for the app: ';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch((err) => console.error('Error opening email app:', err));
  };

  const handleReportABug = () => {
    const email = 'mrkamal0120@gmail.com';
    const subject = 'Bug Report';
    const body = 'Hi, I encountered the following bug: ';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch((err) => console.error('Error opening email app:', err));
  };

  const handleInviteFriends = async () => {
    try {
      await Share.share({
        message: 'Hey! 🎉 Check out Overtime App, the ultimate app to effortlessly manage your overtime, leaves, holidays, and shifts. 🚀 Join the community and stay on top of your schedule. Download now and share with friends: https://play.google.com/store/apps/details?id=kamal.dev',
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleLogout = () => {
    setUser(null);
    router.replace('/sign-in')
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDayOffSubmit = () => {
    // Store the selected days off in local storage
    try {
      const jsonValue = JSON.stringify(selectedDays);
      AsyncStorage.setItem('selectedDaysOff', jsonValue);
      console.log(jsonValue);
    } catch (error) {
      console.error('Error storing selected days off in local storage:', error);
    }
    toggleModal();
  };

  const handleDaySelection = (day) => {
    setSelectedDays(prevSelectedDays =>
      prevSelectedDays?.includes(day)
        ? prevSelectedDays?.filter(d => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };
  const handleBackup = () => {
    router.push('/setting/backup')
  };


  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <ScrollView>
        {user?.name ? (<View className="flex-col items-center my-6">
          <TouchableOpacity className="absolute right-4 top-4"
            onPress={handleLogout}
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              tintColor='red'
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 flex-col border-b border-black-200  justify-between items-center"
            onPress={() => router.push('/setting/profile')}
          >
            <Image
              source={icons.robot}
              resizeMode="contain"
              tintColor='white'
              className="w-16 h-16"
            />
            <Text className="text-2xl text-white font-psemibold mt-4">{user?.name || 'John'}</Text>
          </TouchableOpacity>
        </View>) : (
          <TouchableOpacity className="flex-col p-5 items-center my-12"
            onPress={() => router.replace('/sign-in')}
          >
            <Text className="text-2xl text-white font-psemibold mt-4"> LogIn/SignUp</Text>
          </TouchableOpacity>
        )}

        <View className="mt-4">
          <TouchableOpacity className="p-4 border-b border-black-200 flex-row justify-between items-center" onPress={toggleModal}>
            <Image
              source={icons.holiday}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4 text-lg font-psemibold ">Set Day Offs</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />

          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-black-200 flex-row justify-between items-center" onPress={() => router.push('/setting/shifts')}>
            <Image
              source={icons.shift}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4  text-lg font-psemibold">Shifts</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>

          {/* <View className="p-4 border-b border-black-200 flex-row justify-between items-center">
            <Text className="text-white text-lg font-psemibold">Notifications</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notificationsEnabled ? '#407BFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              value={notificationsEnabled} onValueChange={toggleNotifications} />
          </View> */}

          {/* <View className="p-4 border-b border-black-200 flex-row justify-between items-center">
          <Text className="text-white text-lg">Dark Theme</Text>
          <Switch value={isDarkTheme} onValueChange={setDarkTheme} />
        </View> */}

          <TouchableOpacity className="p-4 border-b border-black-200 flex-row justify-between items-center" onPress={handleRateApp}>
            <Image
              source={icons.star}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4 text-lg font-psemibold">Rate App</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity className="p-4 border-b border-black-200 flex-row justify-between items-center" onPress={handleBackup}>
            <Image
              source={icons.backup}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white mx-4 flex-1 text-lg font-psemibold">Back Up</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <TouchableOpacity className="p-4 border-b border-black-200 flex-row justify-between items-center" onPress={handleInviteFriends}>
            <Image
              source={icons.share}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4 text-lg font-psemibold">Invite Friends</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleReportABug} className="p-4 border-b border-black-200 flex-row justify-between items-center">
            <Image
              source={icons.bug}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4 text-lg font-psemibold">Report a Bug</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSuggestions}
            className="p-4 border-b border-black-200 flex-row justify-between items-center" >
            <Image
              source={icons.light}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4 text-lg font-psemibold">Suggestions</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <TouchableOpacity className="p-4 border-b border-black-200 flex-row justify-between items-center" onPress={() => router.push('/setting/about')}>
            <Image
              source={icons.info}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
            <Text className="text-white flex-1 mx-4 text-lg font-psemibold">About</Text>
            <Image
              source={icons.right}
              resizeMode="contain"
              tintColor='white'
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <Modal visible={isModalVisible} animationType="slide">
          <View className="bg-primary h-full px-8 justify-center">
            <Text className="text-white text-lg font-semibold mb-4">Select Your Day(s) Off</Text>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
              <View key={index} className="flex-col mb-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-white font-pregular">{day}</Text>
                  <Checkbox
                    value={selectedDays?.includes(day)}
                    onValueChange={() => handleDaySelection(day)}
                  />
                </View>
                {index < 6 && <View className="bg-gray-500 h-px my-2" />}
              </View>
            ))}
            <View className="flex-row justify-between py-8 px-8">
              <TouchableOpacity className="w-2/5 py-2 rounded-xl bg-red-600" onPress={toggleModal}  >
                <Text className="font-pregular text-center  text-white" >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-2/5 py-2 rounded-xl bg-secondary" onPress={handleDayOffSubmit} >
                <Text className="font-pregular text-center text-white" >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Settings;
