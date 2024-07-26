import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const HistoryLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default HistoryLayout;
