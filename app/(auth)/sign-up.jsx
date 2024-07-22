// screens/SignUp.js
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

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
      router.replace('/settings/shifts');
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
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Overtime
          </Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Company"
            value={form.company}
            handleChangeText={(e) => setForm({ ...form, company: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Phone"
            value={form.phone}
            handleChangeText={(e) => setForm({ ...form, phone: e })}
            otherStyles="mt-7"
            keyboardType="phone-pad"
          />

          {otpSent && (
            <FormField
              title="OTP"
              value={form.otp}
              handleChangeText={(e) => setForm({ ...form, otp: e })}
              otherStyles="mt-7"
              keyboardType="numeric"
            />
          )}

          {!otpSent ? (
            <CustomButton
              title="Send OTP"
              handlePress={sendOtp}
              containerStyles="mt-7"
            />
          ) : (
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
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
