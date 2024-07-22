import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useFocusEffect } from '@react-navigation/native';
import { DateSelector, Timer, Actions, CustomButton, ShiftSelect } from '../../../components';
import { icons } from '../../../constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [checkInTime, setCheckInTime] = useState(null);
  const [isCheckInPickerVisible, setCheckInPickerVisibility] = useState(false);
  // const [showLeavePicker, setShowLeavePicker] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState('Casual');

  useFocusEffect(
    useCallback(() => {
      const loadStoredData = async () => {
        const storedData = await AsyncStorage.getItem('workData');
        // console.log(storedData);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const data = parsedData[selectedDate] || {};
          if (data.checkOut) {
            setStatus('checkedOut');
            setMessageType('party')
            setMessage('You completed your work. Enjoy the day!');
          } else if (data?.holiday) {
            setStatus('holiday');
            setMessageType('party')
            setMessage('Today is a holiday. Enjoy your day off!');
          } else if (data.leave) {
            if (data.leave === 'Sick') {
              setStatus('leave');
              setMessageType('getwell')
              setMessage(`You are on ${data.leave} leave. Get well soon!`);
            } else if (data.leave === 'Emergency') {
              setStatus('leave');
              setMessageType('emergency');
              setMessage(`You are on ${data.leave} leave. Take care!`);
            } else {
              setStatus('leave');
              setMessageType('party');
              setMessage(`You are on ${data.leave} leave. Enjoy your day off!`);
            }
          } else if (data.halfDay) {
            setStatus('halfDay');
            setMessageType('party')
            setMessage('You are on half day. Take care!');
          } else {
            setStatus(null);
          }
        }
      };
      loadStoredData();
    }, [selectedDate])
  );

  const handleCheckInOut = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      const totalTime = timer;
      saveData('checkOut', new Date());
      setTimer(0);
      setStatus('checkedOut');
      setMessage('You completed your work. Enjoy the day!');
    } else {
      const currentTime = new Date();
      setCheckInTime(currentTime);
      saveData('checkIn', currentTime);
      setStatus(null);
    }
  };

  const saveData = async (type, data) => {
    try {
      const storedData = await AsyncStorage.getItem('workData');
      const parsedData = storedData ? JSON.parse(storedData) : {};
      const existingData = parsedData[selectedDate] || {};

      if (type === 'leave' || type === 'holiday') {
        // Only keep relevant data types
        parsedData[selectedDate] = {
          [type]: data,
          checkIn: existingData.checkIn,
          checkOut: existingData.checkOut,
          overtime: existingData.overtime,
          halfDay: existingData.halfDay,
        };
      } else {
        // Merge other data types normally
        parsedData[selectedDate] = { ...existingData, [type]: data };
      }

      await AsyncStorage.setItem('workData', JSON.stringify(parsedData));
      console.log(parsedData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  const handleAddOvertime = (time) => {
    console.log('Overtime added:', time);
    saveData('Overtime', time);
    setStatus('overtime');
    setMessage(`You done ${time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} Hours Overtime. Enjoy your day!`);
    // Handle the logic to add the overtime
  };

  const handleMarkHoliday = async () => {
    saveData('holiday', true);
    setStatus('holiday');
    setMessage('Today is a holiday. Enjoy your day off!');
  };

  const handleSetLeave = async (leaveType) => {
    saveData('leave', leaveType);
    setStatus('leave');
    setMessage(`You are on ${leaveType} leave. Take Care!`);
    // setShowLeavePicker(false);
  };

  let iconSource;
  switch (messageType) {
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
    <SafeAreaView className="bg-primary h-full px-4">
      <View className="my-4 flex-row justify-center items-center">
        <Text className="text-xl text-white font-semibold">Home</Text>
      </View>
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ScrollView>
        {status ? (
          <View className="my-12 items-center justify-center">
            <Image
              source={iconSource}
              className="max-w-[380px] w-full h-[298px]"
              resizeMode="contain"
            />
            <Text className="text-xl text-white my-8 font-pmedium text-center">{message}</Text>
            <CustomButton
              title="Edit"
              handlePress={() => setStatus(null)}
              containerStyles="w-full mt-4"
              textStyles="text-white"
            />
          </View>
        ) : (
          <>
            <ShiftSelect />
            <Timer isRunning={isRunning} timer={timer} setTimer={setTimer} handleCheckInOut={handleCheckInOut} />
            <View className="mt-7 space-y-2">
              <Text className="text-base text-gray-100 font-pmedium">Check In Time</Text>
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
                <TouchableOpacity onPress={() => setCheckInPickerVisibility(true)}>
                  <Text className="bg-black-100 p-4 py-2 font-psemibold rounded-lg text-white">{checkInTime ? checkInTime.toLocaleTimeString() : 'Set Check-In Time'}</Text>
                </TouchableOpacity>
                {isCheckInPickerVisible && (
                  <DateTimePicker
                    value={checkInTime || new Date()}
                    mode="time"
                    display="spinner"
                    minuteInterval={5}
                    onChange={(event, selectedDate) => {
                      setCheckInPickerVisibility(false);
                      if (selectedDate) {
                        setCheckInTime(selectedDate);
                        saveData('checkIn', selectedDate);
                      }
                    }}
                  />
                )}
              </View>
            </View>
            <Actions
              handleMarkHoliday={handleMarkHoliday}
              handleAddOvertime={handleAddOvertime}
            />
            <View className="mt-4 px-4 py-1 bg-black-100 rounded-2xl border-2 border-black-200">
              <Picker
                selectedValue={selectedLeave}
                onValueChange={(itemValue) => {
                  setSelectedLeave(itemValue);
                }}
                style={{
                  color: 'white',
                  borderRadius: 8,
                }}
                itemStyle={{
                  color: 'white',
                }}
              >
                <Picker.Item label="Casual" value="Casual" />
                <Picker.Item label="Sick" value="Sick" />
                <Picker.Item label="Emergency" value="Emergency" />
                <Picker.Item label="Vacation" value="Vacation" />
              </Picker>
            </View>

            <CustomButton
              title="Set Leave"
              handlePress={() => handleSetLeave(selectedLeave)}
              textStyles="text-white"
              containerStyles="mt-4 w-full"
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
