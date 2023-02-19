import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import RandomModeScreen from "./components/screens/RandomModeScreen";
import ExamModeScreen from "./components/screens/ExamModeScreen";
import CategoryModeScreen from "./components/screens/CategoryModeScreen";
import MainMenuScreen from "./components/screens/MainMenuScreen";
import CategorySelectScreen from "./components/screens/CategorySelectScreen";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import './localization/i18n';
import AboutScreen from "./components/screens/AboutScreen";
import {StatusBar} from "expo-status-bar";

const CustomTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <NavigationContainer theme={CustomTheme}>
                <Stack.Navigator initialRouteName="MainMenu" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="MainMenu" component={MainMenuScreen}/>
                    <Stack.Screen name="RandomMode" component={RandomModeScreen}/>
                    <Stack.Screen name="ExamMode" component={ExamModeScreen}/>
                    <Stack.Screen name="CategoryMode" component={CategoryModeScreen}/>
                    <Stack.Screen name="CategorySelect" component={CategorySelectScreen}/>
                    <Stack.Screen name="About" component={AboutScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;

