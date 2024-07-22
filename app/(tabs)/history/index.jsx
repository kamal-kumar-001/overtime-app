import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalendarList } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [workData, setWorkData] = useState({});
  const [selectedDateData, setSelectedDateData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem('workData');
      if (storedData) {
        setWorkData(JSON.parse(storedData));
      }
    };
    fetchData();
  }, []);

  const handleDateClick = (day) => {
    setCurrentDate(day.dateString);
    setSelectedDateData(workData[day.dateString] || null);
  };

  const markHoliday = async (date) => {
    const updatedData = { ...workData, [date]: { ...workData[date], holiday: true } };
    setWorkData(updatedData);
    await AsyncStorage.setItem('workData', JSON.stringify(updatedData));
    setSelectedDateData(updatedData[date]);
  };

  const handleAddOvertime = async (date) => {
    // Implement the logic to add overtime (omitted for brevity)
    Alert.alert('Add Overtime', `Add overtime for ${date}`);
  };

  const calendarTheme = {
    backgroundColor: '#161622',
    calendarBackground: '#161622',
    textSectionTitleColor: '#ffffff',
    selectedDayBackgroundColor: '#407BFF',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#407BFF',
    dayTextColor: '#ffffff',
    textDisabledColor: 'gray',
    dotColor: '#ffffff',
    selectedDotColor: '#ffffff',
    arrowColor: '#ffffff',
    monthTextColor: '#ffffff',
    indicatorColor: '#ffffff',
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-4 flex-row justify-center items-center">
        <Text className="text-xl text-white font-semibold">History</Text>
      </View>

      <CalendarList
        onVisibleMonthsChange={(months) => {
          console.log('now these months are visible', months);
        }}
        pastScrollRange={50}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}
        onDayPress={handleDateClick}
        horizontal={true}
        pagingEnabled={true}
        theme={calendarTheme}
        style={{ width: Dimensions.get('window').width }}
        markedDates={{
          ...Object.keys(workData).reduce((acc, date) => {
            acc[date] = { marked: true, dotColor: workData[date].holiday ? 'red' : 'green' };
            return acc;
          }, {}),
          [currentDate]: { selected: true, marked: true, selectedColor: '#FF9C01' },
        }}
      />

      <View className="p-4">
        {selectedDateData ? (
          <View>
            <Text className="text-white text-lg">Date: {currentDate}</Text>
            {selectedDateData.holiday ? (
              <Text className="text-red-500 text-lg">Holiday</Text>
            ) : (
              <View>
                {selectedDateData.checkIn && (
                  <Text className="text-white">Check-In: {new Date(selectedDateData.checkIn).toLocaleTimeString()}</Text>
                )}
                {selectedDateData.checkOut && (
                  <Text className="text-white">Check-Out: {selectedDateData.checkOut !== 0 ? new Date(selectedDateData.checkOut).toLocaleTimeString() : 'Not Checked Out'}</Text>
                )}
                {selectedDateData.overtime && (
                  <Text className="text-white">Overtime: {selectedDateData.overtime}</Text>
                )}
                {selectedDateData.leave && (
                  <Text className="text-white">Leave: {selectedDateData.leave}</Text>
                )}
              </View>
            )}
            {!selectedDateData.holiday && (
              <TouchableOpacity onPress={() => handleAddOvertime(currentDate)} className="mt-4 p-4 bg-green-500 rounded-lg">
                <Text className="text-white text-center">Add Overtime</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>
            <Text className="text-white">No data available for {currentDate}</Text>
            <TouchableOpacity onPress={() => markHoliday(currentDate)} className="mt-4 p-4 bg-red-500 rounded-lg">
              <Text className="text-white text-center">Mark as Holiday</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CalendarPage;
