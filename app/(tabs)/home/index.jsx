import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { useFocusEffect } from '@react-navigation/native';
import { DateSelector, Actions, StatusMessage } from '../../../components';

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [shifts, setShifts] = useState([]);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');


  const loadStoredData = async () => {
    const storedData = await AsyncStorage.getItem('workData');
    const storedShifts = await AsyncStorage.getItem('userShifts');
    if (storedShifts) {
      setShifts(JSON.parse(storedShifts));
    }
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const data = parsedData[selectedDate] || {};
      if (data?.Overtime) {
        setStatus('overtime');
        setMessageType('party');
        setMessage(`You done ${data?.Overtime?.duration || ''} Hours Overtime. Enjoy your day!`);
      } else if (data.checkOut && !data?.Overtime) {
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
        setMessage('');
        setMessageType('');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadStoredData();
    }, [selectedDate])
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await loadStoredData();
    setRefreshing(false);
  };
  const saveData = async (type, data) => {
    try {
      const storedData = await AsyncStorage.getItem('workData');
      const parsedData = storedData ? JSON.parse(storedData) : {};

      // Reset the data for the selected date
      parsedData[selectedDate] = {};

      if (type === 'Overtime') {
        parsedData[selectedDate] = {
          checkIn: data.checkIn || null,
          checkOut: data.checkOut || null,
          overtime: { startTime: data.startTime, endTime: data.endTime, duration: data.duration },
        };
      } else if (type === 'checkInOut') {
        parsedData[selectedDate] = {
          checkIn: data.checkIn || null,
          checkOut: data.checkOut || null,
        };
      } else {
        parsedData[selectedDate] = { [type]: data, };
      }

      await AsyncStorage.setItem('workData', JSON.stringify(parsedData));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  const handleCheckOut = ({ checkIn, checkOut }) => {
    saveData('checkInOut', { checkIn, checkOut });
    setStatus('checkedOut');
    setMessage('You completed your work. Enjoy the day!');
  };

  const handleAddOvertime = ({ startTime, endTime, duration, checkInTime, checkOutTime }) => {
    saveData('Overtime', { startTime, endTime, duration, checkIn: checkInTime, checkOut: checkOutTime });
    setStatus('overtime');
    setMessage(`You did ${duration} Hours Overtime. Enjoy your day!`);
  };

  const handleMarkHoliday = async () => {
    saveData('holiday', true);
    setStatus('holiday');
    setMessage('Today is a holiday. Enjoy your day off!');
  };
  const handleHalfday = async () => {
    saveData('halfday', true);
    setStatus('halfday');
    setMessage('Today is a Halfday. Enjoy your day off!');
  };

  const handleSetLeave = async (leaveType) => {
    saveData('leave', leaveType);
    setStatus('leave');
    setMessage(`You are on ${leaveType} leave. Take Care!`);
    // setShowLeavePicker(false);
  };


  return (
    <SafeAreaView className="bg-primary h-full px-4">
      <View className="my-4 flex-row justify-center items-center">
        <Text className="text-xl text-white font-semibold">Welcome {user?.name || 'Buddy'}</Text>
      </View>
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {status ? (<StatusMessage message={message} messageType={messageType} setStatus={setStatus} />) : (
          <>
            <Actions
              shifts={shifts}
              handleCheckOut={handleCheckOut}
              handleMarkHoliday={handleMarkHoliday}
              handleAddOvertime={handleAddOvertime}
              handleSetLeave={handleSetLeave}
              handleHalfday={handleHalfday}
            />

          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
