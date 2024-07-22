// screens/SignIn.js
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
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
    if (form.phone === "" || form.otp === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (form.otp !== "6969") {
      Alert.alert("Error", "Invalid OTP");
      return;
    }

    setSubmitting(true);

    try {
      // Retrieve user data from local storage
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        throw new Error("User not found");
      }

      const user = JSON.parse(userData);

      // Match phone number
      if (user.phone !== form.phone) {
        throw new Error("Invalid phone number");
      }

      // If phone number matches, set user as logged in
      await AsyncStorage.setItem('userToken', user.token);
      setUser(user);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
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
            Log in to Overtime
          </Text>

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
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          )}

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
