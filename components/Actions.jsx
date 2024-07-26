import { Text, TouchableOpacity, View, Image } from 'react-native';
import LeaveSelector from './LeaveSelector';
import ShiftSelect from './SelectShift';
import { icons } from '../constants';


const Actions = ({ handleMarkHoliday, handleHalfday, handleAddOvertime, handleSetLeave, shifts, handleCheckOut }) => {

    return (
        <View className=" space-y-4">
            <ShiftSelect shifts={shifts} handleCheckOut={handleCheckOut} handleAddOvertime={handleAddOvertime} />
            <View className="flex flex-row justify-between">
                <TouchableOpacity
                    onPress={handleHalfday}
                    activeOpacity={0.7}
                    className={`rounded-xl bg-red-400  px-5 min-h-[150px] flex flex-col justify-center items-center mt-8`}
                >
                    <Image
                        source={icons.halftime}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-16 h-16"
                    />
                    <Text className={`font-psemibold mt-2 text-lg text-white`}>
                        Set Halfday {"   "}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleMarkHoliday}
                    activeOpacity={0.7}
                    className={`rounded-xl bg-red-600 min-h-[150px] px-5 flex flex-col justify-center items-center mt-8`}
                >
                    <Image
                        source={icons.holiday}
                        resizeMode="contain"
                        tintColor='white'
                        className="w-16 h-16"
                    />
                    <Text className={`font-psemibold mt-2 text-lg text-white`}>
                        Set Holiday {"   "}
                    </Text>
                </TouchableOpacity>
            </View>
            <LeaveSelector handleSetLeave={handleSetLeave} />

        </View>
    );
};

export default Actions;
