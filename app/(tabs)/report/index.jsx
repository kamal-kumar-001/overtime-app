import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomModal, DatePicker, ReportSummary } from '../../../components';

const mockData = {
    "2024-07-20": {
        "checkIn": "2024-07-20T08:50:52.544Z",
        "checkOut": "2024-07-20T09:50:52.544Z",
        "overtime": "5:30 hrs"
    },
    "2024-07-24": {
        "holiday": true
    },
    "2024-07-21": {
        "holiday": true
    },
    "2024-07-22": {
        "checkIn": "2024-07-20T08:59:51.746Z",
        "checkOut": 0
    },
    "2024-07-23": {
        "leave": "Emergency",
        "holiday": true
    }
};

const getCurrentMonthDates = () => {
    const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
    return { start, end };
};

const ReportPage = () => {
    const { start, end } = getCurrentMonthDates();
    const [startDate, setStartDate] = useState(start);
    const [endDate, setEndDate] = useState(end);
    const [overtimeModalVisible, setOvertimeModalVisible] = useState(false);
    const [leaveModalVisible, setLeaveModalVisible] = useState(false);
    const [halfTimeModalVisible, setHalfTimeModalVisible] = useState(false);
    const [holidayModalVisible, setHolidayModalVisible] = useState(false);

    const calculateOvertime = () => {
        // Logic to calculate total overtime
        return "15:30 hrs";
    };

    const calculateLeaves = () => {
        // Logic to calculate total leaves
        return { sick: 2, emergency: 1, casual: 3 };
    };

    const calculateHalfTime = () => {
        // Logic to calculate half-time
        return 2;
    };

    const calculateHolidays = () => {
        // Logic to calculate holidays
        return 5;
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="flex flex-col py-8 px-8">
                <View className="flex-row">
                    <DatePicker label="Start Date" date={startDate} setDate={setStartDate} />
                    <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
                </View>

                <ReportSummary
                    label="Total Overtime"
                    value={calculateOvertime()}
                    onPress={() => setOvertimeModalVisible(true)}
                />
                <ReportSummary
                    label="Total Leave (Sick, Emergency, Casual)"
                    value={Object.values(calculateLeaves()).reduce((a, b) => a + b, 0)}
                    onPress={() => setLeaveModalVisible(true)}
                />
                <ReportSummary
                    label="Total Annual Leaves"
                    value="10"  // Logic to get annual leaves
                    onPress={() => setLeaveModalVisible(true)}
                />
                <ReportSummary
                    label="Half Time"
                    value={calculateHalfTime()}
                    onPress={() => setHalfTimeModalVisible(true)}
                />
                <ReportSummary
                    label="Holidays"
                    value={calculateHolidays()}
                    onPress={() => setHolidayModalVisible(true)}
                />
            </ScrollView>

            <CustomModal
                visible={overtimeModalVisible}
                onClose={() => setOvertimeModalVisible(false)}
                title="Overtime History"
            >
                {/* Logic to display overtime history */}
            </CustomModal>

            <CustomModal
                visible={leaveModalVisible}
                onClose={() => setLeaveModalVisible(false)}
                title="Leave History"
            >
                {/* Logic to display leave history */}
            </CustomModal>

            <CustomModal
                visible={halfTimeModalVisible}
                onClose={() => setHalfTimeModalVisible(false)}
                title="Half Time History"
            >
                {/* Logic to display half-time history */}
            </CustomModal>

            <CustomModal
                visible={holidayModalVisible}
                onClose={() => setHolidayModalVisible(false)}
                title="Holiday History"
            >
                {/* Logic to display holiday history */}
            </CustomModal>
        </SafeAreaView>
    );
};

export default ReportPage;
