import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { format, addDays, startOfMonth, endOfMonth } from 'date-fns';

const getMonthDates = () => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const dates = [];
    for (let date = start; date <= end; date = addDays(date, 1)) {
        dates.push(date);
    }
    return dates;
};

const DateSelector = ({ selectedDate, setSelectedDate }) => {
    const dates = getMonthDates();
    const currentIndex = dates.findIndex(date => format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'));
    const flatListRef = useRef(null);

    useEffect(() => {
        if (flatListRef.current && currentIndex !== -1) {
            flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
        }
    }, [currentIndex]);

    const getItemLayout = (data, index) => (
        { length: 70, offset: 70 * index, index }
    );

    return (
        <View className="my-4">
            <FlatList
                ref={flatListRef}
                horizontal
                data={dates}
                keyExtractor={(item) => format(item, 'yyyy-MM-dd')}
                renderItem={({ item, index }) => {
                    const date = format(item, 'yyyy-MM-dd');
                    return (
                        <TouchableOpacity
                            key={date}
                            className={`p-4 rounded-xl mx-2 ${selectedDate === date ? 'bg-secondary' : 'bg-black-100'}`}
                            onPress={() => setSelectedDate(date)}
                        >
                            <Text className="text-white text-center">{format(item, 'EEE')}</Text>
                            <Text className="text-gray-400 text-center">{format(item, 'dd')}</Text>
                        </TouchableOpacity>
                    );
                }}
                showsHorizontalScrollIndicator={false}
                getItemLayout={getItemLayout}
                initialScrollIndex={currentIndex}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
            />
        </View>
    );
};

export default DateSelector;
