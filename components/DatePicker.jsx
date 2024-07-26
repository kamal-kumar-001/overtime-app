import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ label, date, setDate }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View className="flex flex-col items-start py-4 px-8">
            <Text className="text-white mb-2">{label}</Text>
            <TouchableOpacity onPress={() => setShow(true)} className="border-2 border-secondary p-4 rounded-lg">
                <Text className="text-white font-pregular ">{date.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="calendar"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

export default DatePicker;
