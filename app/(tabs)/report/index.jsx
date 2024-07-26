import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomModal, DatePicker, ReportSummary } from '../../../components';
import { icons } from '../../../constants';

const getCurrentMonthDates = () => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    return { start, end };
};

const ReportPage = () => {
    const { start, end } = getCurrentMonthDates();
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    const [workData, setWorkData] = useState({});
    const [overtimeModalVisible, setOvertimeModalVisible] = useState(false);
    const [leaveModalVisible, setLeaveModalVisible] = useState(false);
    const [halfTimeModalVisible, setHalfTimeModalVisible] = useState(false);
    const [holidayModalVisible, setHolidayModalVisible] = useState(false);
    const [overtimeHistory, setOvertimeHistory] = useState([]);
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [halfTimeHistory, setHalfTimeHistory] = useState([]);
    const [holidayHistory, setHolidayHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        const storedData = await AsyncStorage.getItem('workData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setWorkData(parsedData);
            calculateHistories(parsedData);
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

    const calculateHistories = (data) => {
        const overtimeHistory = [];
        const leaveHistory = [];
        const halfTimeHistory = [];
        const holidayHistory = [];

        Object.keys(data).forEach(date => {
            if (data[date].overtime) {
                overtimeHistory.push({ date, ...data[date].overtime });
            }
            if (data[date].leave) {
                leaveHistory.push({ date, leave: data[date].leave });
            }
            if (data[date].halfday) {
                halfTimeHistory.push({ date });
            }
            if (data[date].holiday) {
                holidayHistory.push({ date });
            }
        });

        setOvertimeHistory(overtimeHistory);
        setLeaveHistory(leaveHistory);
        setHalfTimeHistory(halfTimeHistory);
        setHolidayHistory(holidayHistory);
    };

    const calculateOvertime = () => {
        // Helper function to convert hh:mm to total minutes
        const toMinutes = (hhmm) => {
            const [hours, minutes] = hhmm.split(':').map(Number);
            return hours * 60 + minutes;
        };

        // Helper function to convert total minutes to hh:mm
        const toHHMM = (totalMinutes) => {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };

        // Sum up all durations in minutes
        const totalMinutes = overtimeHistory.reduce((total, entry) => {
            return total + toMinutes(entry.duration);
        }, 0);

        // Convert total minutes back to hh:mm format
        return toHHMM(totalMinutes);
    };


    const calculateLeaves = () => {
        const leaveCounts = { sick: 0, emergency: 0, casual: 0 };
        leaveHistory.forEach(entry => {
            leaveCounts[entry.leave.toLowerCase()] += 1;
        });
        return leaveCounts;
    };

    const calculateHalfTime = () => {
        return halfTimeHistory.length;
    };

    const calculateHolidays = () => {
        return holidayHistory.length;
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="mt-8 flex-row justify-center items-center">
                <Text className="text-xl text-white font-psemibold">Report</Text>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
                className="flex flex-col py-4 px-8">
                <View className="flex-row justify-center mb-4">
                    <DatePicker label="Start Date" date={startDate} setDate={setStartDate} />
                    <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
                </View>

                <ReportSummary
                    icon={icons.uptime}
                    label="Over Times"
                    value={calculateOvertime()}
                    onPress={() => setOvertimeModalVisible(true)}
                />
                <ReportSummary
                    icon={icons.leave}
                    label="Leaves"
                    value={Object.values(calculateLeaves()).reduce((a, b) => a + b, 0)}
                    onPress={() => setLeaveModalVisible(true)}
                />
                {/* <ReportSummary
                    label="Total Annual Leaves"
                    value="Soon"  // Placeholder value, replace with actual logic if needed
                    onPress={() => setLeaveModalVisible(true)}
                /> */}
                <ReportSummary
                    label="Half Times"
                    icon={icons.halftime}
                    value={calculateHalfTime()}
                    onPress={() => setHalfTimeModalVisible(true)}
                />
                <ReportSummary
                    icon={icons.holiday}
                    label="Holidays"
                    value={calculateHolidays()}
                    onPress={() => setHolidayModalVisible(true)}
                />
            </ScrollView>

            <CustomModal
                visible={overtimeModalVisible}
                onClose={() => setOvertimeModalVisible(false)}
                title="Overtimes"
            >
                {overtimeHistory.length === 0 ? (
                    <Text className="text-white text-xl font-pregular mt-4">
                        No data available
                    </Text>
                ) : (overtimeHistory.map(entry => (
                    <View key={entry.date} className="text-white mt-4 border-b-2 border-gray-400 flex flex-row justify-between ">
                        <Text className="text-white text-xl font-pregular">
                            {entry.date}:
                        </Text>
                        <Text className="text-white text-xl font-pregular">
                            {entry.duration} hrs
                        </Text>
                    </View>
                )))}
            </CustomModal>

            <CustomModal
                visible={leaveModalVisible}
                onClose={() => setLeaveModalVisible(false)}
                title="Leaves"
            >
                {leaveHistory.length === 0 ? (
                    <Text className="text-white text-xl font-pregular mt-4">
                        No data available
                    </Text>
                ) : (leaveHistory.map(entry => (
                    <View key={entry.date} className="text-white mt-4 border-b-2 border-gray-400 flex flex-row justify-between ">
                        <Text className="text-white text-xl font-pregular">
                            {entry.date}:
                        </Text>
                        <Text className="text-white text-xl font-pregular">
                            {entry.leave}
                        </Text>
                    </View>
                )))}
            </CustomModal>

            <CustomModal
                visible={halfTimeModalVisible}
                onClose={() => setHalfTimeModalVisible(false)}
                title="Half Times"
            >
                {halfTimeHistory.length === 0 ? (
                    <Text className="text-white text-xl font-pregular mt-4">
                        No data available
                    </Text>
                ) : (halfTimeHistory.map(entry => (
                    <View key={entry.date} className="text-white mt-4 border-b-2 border-gray-400 flex flex-row justify-between ">
                        <Text className="text-white text-xl font-pregular">
                            {entry.date}:
                        </Text>
                        <Text className="text-white text-xl font-pregular">
                            Half Day
                        </Text>
                    </View>
                )))}
            </CustomModal>

            <CustomModal
                visible={holidayModalVisible}
                onClose={() => setHolidayModalVisible(false)}
                title="Holidays"
            >
                {holidayHistory.length === 0 ? (
                    <Text className="text-white text-xl font-pregular mt-4">
                        No data available
                    </Text>
                ) : (holidayHistory.map(entry => (
                    <View key={entry.date} className="text-white mt-4 border-b-2 border-gray-400 flex flex-row justify-between ">
                        <Text className="text-white text-xl font-pregular">
                            {entry.date}:
                        </Text>
                        <Text className="text-white text-xl font-pregular">
                            Holiday
                        </Text>
                    </View>
                )))}
            </CustomModal>
        </SafeAreaView>
    );
};

export default ReportPage;
