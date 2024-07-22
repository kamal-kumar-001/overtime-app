import { Text, TouchableOpacity } from 'react-native'

const SkipButton = ({ onPress }) => {
    return (
        <TouchableOpacity className="border-2 mt-5 rounded-full border-secondary" onPress={onPress}>
            <Text className="text-base  py-1 px-4 font-psemibold text-secondary">Skip</Text>
        </TouchableOpacity>
    )
}

export default SkipButton