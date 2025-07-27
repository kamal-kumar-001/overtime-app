import React, { useState, useEffect, lazy, Suspense } from 'react';
import { View, Text, Dimensions, ScrollView, RefreshControl, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../../constants';
import { Loader } from '../../../components';

const CalendarList = lazy(() => import('react-native-calendars').then(module => ({ default: module.CalendarList })));
const HistoryPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [workData, setWorkData] = useState({});
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedDaysOff, setSelectedDaysOff] = useState([]);

  const fetchData = async () => {
    const storedData = await AsyncStorage.getItem('workData');
    const storedDaysOff = await AsyncStorage.getItem('selectedDaysOff');
    if (storedData) {
      setWorkData(JSON.parse(storedData));
    }
    if (storedDaysOff) {
      setSelectedDaysOff(JSON.parse(storedDaysOff));
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDateClick = (day) => {
    setCurrentDate(day.dateString);
    setSelectedDateData(workData[day.dateString] || null);
  };

  const isDayOff = (dateString) => {
    const dayOfWeek = new Date(dateString).getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return selectedDaysOff.includes(dayNames[dayOfWeek]);
  };

  const getMarkedDates = () => {
    let markedDates = {};
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1);
    const endDate = new Date(today.getFullYear(), 11, 31);

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split('T')[0];
      markedDates[dateString] = {
        marked: workData[dateString] ? true : false,
        dotColor: workData[dateString] ? (workData[dateString].holiday || workData[dateString].leave ? 'red' : 'green') : 'transparent',
        selected: isDayOff(dateString),
        selectedColor: isDayOff(dateString) ? '#B0B0B0' : undefined,
      };
    }

    markedDates[currentDate] = {
      ...markedDates[currentDate],
      selected: true,
      selectedColor: '#407BFF',
    };

    return markedDates;
  };

  const calendarTheme = {
    'stylesheet.day.basic': {
      base: {
        width: 42, // Adjust the width as needed
        height: 42, // Adjust the height as needed
        borderRadius: 10, // Adjust the border radius as needed
        alignItems: 'center',
        justifyContent: 'center',
        text: 'center',
        paddingTop: 2,
      },
      selected: {
        borderRadius: 10, // Same border radius as base
      },
    },
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
    textMonthFontFamily: 'Poppins-Bold', // Example for month text font
    textDayFontFamily: 'Poppins-Regular', // Example for day text font
    textDayHeaderFontFamily: 'Poppins-SemiBold',
  };
  // const jumpToToday = () => {
  //   const today = new Date().toISOString().split('T')[0];
  //   setCurrentDate(today);
  //   setSelectedDateData(workData[today] || null);
  // };
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-4 flex-row justify-center items-center">
        <Text className="text-xl text-white font-psemibold">History</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Suspense fallback={<Loader />}>
          <CalendarList
            firstDay={1}
            leftArrowImageSource={icons.previous}
            rightArrowImageSource={icons.next}
            pastScrollRange={12}
            futureScrollRange={12}
            scrollEnabled={true}
            showScrollIndicator={false}
            onDayPress={handleDateClick}
            horizontal={true}
            pagingEnabled={true}
            theme={calendarTheme}
            style={styles.calendar}
            markedDates={getMarkedDates()}
          />
        </Suspense>

        <View className="p-4 ">
          {selectedDateData ? (
            <View>
              <Text className="text-white text-xl my-5  font-pregular text-center">Date: {currentDate}</Text>
              {selectedDateData.holiday ? (
                <Text className="text-red-500 text-xl   font-pregular text-center">Holiday</Text>
              ) : (
                <View className="flex-col flex items-start mx-auto">
                  {selectedDateData.checkIn && (
                    <Text className="text-white text-xl   font-pregular text-center uppercase ">Check In:{"       "}  {new Date(selectedDateData.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                  )}
                  {selectedDateData.checkOut && (
                    <Text className="text-white text-xl   font-pregular text-center uppercase">Check Out:{"   "}  {selectedDateData.checkOut !== 0 ? new Date(selectedDateData.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not Checked Out'}</Text>
                  )}
                  {selectedDateData.overtime && (
                    <Text className="text-white text-xl   font-pregular text-center uppercase">Overtime: {"      "} {selectedDateData.overtime.duration} hrs</Text>
                  )}
                  {selectedDateData.leave && (
                    <Text className="text-white text-xl   font-pregular text-center">Leave: {selectedDateData.leave}</Text>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text className="text-white text-xl my-5   font-pregular text-center">Date: {currentDate}</Text>
              <Text className="text-white text-xl font-pregular text-center">No data available</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        onPress={jumpToToday}
        activeOpacity={0.7}
        className={`rounded-full flex items-center justify-center bg-secondary w-12 h-12 absolute right-5 bottom-5`}
      >
        <Image
          source={icons.halftime}
          resizeMode="contain"
          tintColor='white'
          className="w-6 h-6"
        />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  calendar: {
    width: Dimensions.get('window').width,
  },
  selectedDate: {
    borderRadius: 12,
  },
});
export default HistoryPage;
