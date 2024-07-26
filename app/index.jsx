import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";
import { icons } from "../constants";

const Welcome = () => {
  const { loading, user, setUser } = useGlobalContext();

  if (!loading && user) return <Redirect href="/home" />;
  const handleGuest = () => {
    setUser("Guest");
    router.push("/home")
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={icons.welcome}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Manage Your{"\n"}
              Overtime and Leaves{" "}
              Effortlessly with{"\n"}
              <Text className="text-[#407BFF]"> Overtime</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Keep track of your work hours, leaves, and shifts with ease using our app.
          </Text>

          <CustomButton
            title="Continue with Phone"
            handlePress={() => router.push("/sign-up")}
            containerStyles="w-full mt-7 bg-secondary "
            textStyles='text-white'
          />
          <TouchableOpacity onPress={handleGuest}>
            <Text
              className="text-sm font-pregular text-gray-200 mt-8 underline text-center"
            >
              Continue as Guest
            </Text>

            <Text className="text-xs font-pregular text-gray-300 mt-2 text-center">
              You may lose data
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
