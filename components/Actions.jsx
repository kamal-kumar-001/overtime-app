import { View } from 'react-native';
import OvertimeComponent from './OverTime';
import CustomButton from './CustomButton';



const Actions = ({ handleMarkHoliday, handleAddOvertime }) => {

    return (
        <View className="mt-8 space-y-4">
            <OvertimeComponent handleAddOvertime={handleAddOvertime} />
            <CustomButton
                title={"Mark as Holiday"}
                handlePress={handleMarkHoliday}
                textStyles='text-white'
                containerStyles="mt-4 w-full" />

        </View>
    );
};

export default Actions;
