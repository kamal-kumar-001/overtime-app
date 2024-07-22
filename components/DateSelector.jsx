import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { format, addDays } from 'date-fns';

const DateSelector = ({ selectedDate, setSelectedDate }) => {
    return (
        <View className="my-4">
            <FlatList
                horizontal
                data={Array.from({ length: 7 })}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ index }) => {
                    const date = format(addDays(new Date(), index), 'yyyy-MM-dd');
                    return (
                        <TouchableOpacity
                            key={date}
                            className={`p-4 rounded-xl mx-2 ${selectedDate === date ? 'bg-secondary' : 'bg-black-100'}`}
                            onPress={() => setSelectedDate(date)}
                        >
                            <Text className="text-white text-center">{format(addDays(new Date(), index), 'EEE')}</Text>
                            <Text className="text-gray-400 text-center">{format(addDays(new Date(), index), 'dd')}</Text>
                        </TouchableOpacity>
                    );
                }}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default DateSelector;
