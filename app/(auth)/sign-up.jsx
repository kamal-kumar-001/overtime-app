// screens/SignUp.js
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = () => {
    if (form.phone === "") {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }
    Alert.alert("OTP Sent", "The OTP is 6969 for demo purposes.");
    setOtpSent(true);
  };

  const submit = async () => {
    if (form.name === "" || form.phone === "" || form.otp === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (form.otp !== "6969") {
      Alert.alert("Error", "Invalid OTP");
      return;
    }

    setSubmitting(true);
    try {
      const token = generateToken();
      const userData = { ...form, token }; // Assuming form contains phone and other necessary fields
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsLogged(true);
      router.replace('/setting/shifts');
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <TouchableOpacity className="border-2 z-50 absolute right-5 top-10 max-w-[75px] mt-5 rounded-full border-secondary" onPress={() => router.replace('/home')}>
        <Text className="text-base  py-1 px-4 font-psemibold text-secondary">Skip</Text>
      </TouchableOpacity>
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image source={icons.icon} className="w-16 h-16" />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Overtime
          </Text>

          <FormField
            title="Name"
            value={form.name}
            placeholder="Enter your name"
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Company"
            placeholder="Enter company name"
            value={form.company}
            handleChangeText={(e) => setForm({ ...form, company: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Phone"
            placeholder="Enter Phone number"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles="mt-7"
            keyboardType="phone-pad"
          />

          {otpSent && (
            <FormField
              title="OTP"
              value={form.otp}
              placeholder="Enter otp"
              handleChangeText={(e) => setForm({ ...form, otp: e })}
              otherStyles="mt-7"
              keyboardType="numeric"
            />
          )}

          {!otpSent ? (
            <CustomButton
              title="Send OTP"
              handlePress={sendOtp}
              containerStyles="mt-7 bg-secondary "
            />
          ) : (
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7 bg-secondary "
              isLoading={isSubmitting}
            />
          )}

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary"
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
