import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../../components";
import { useGlobalContext } from "../../../context/GlobalProvider";

const HomeLayout = () => {
  const { loading } = useGlobalContext();

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default HomeLayout;
