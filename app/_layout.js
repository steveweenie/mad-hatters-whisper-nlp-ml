import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "home",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        'Alice-Regular': require('../assets/fonts/Alice-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Stack initialRouteName="home">
        <Stack.Screen name="home" />
        </Stack>
    )
};

export default Layout;
