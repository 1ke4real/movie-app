import {StyleSheet, Text, View} from 'react-native';
import {HomeScreen} from "./src/screens/Home/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SearchScreen} from "./src/screens/Search/SearchScreen";
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {useFonts} from "expo-font"
import {MovieDetails} from "./src/screens/MovieDetails/MoviesDetails";
import {TvDetails} from "./src/screens/TvDetails/TvDetails";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppLoading from "expo-app-loading";
import * as SplashScreen from 'expo-splash-screen';
import {useCallback, useEffect} from "react";
import {All} from "./src/screens/All/All";
import {GenderScreen} from "./src/screens/Gender/GenderScreen";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

export const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarStyle: [styles.tabBottom],
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray'
            })}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false, title: '', tabBarIcon: ({color, size}) => (

                    <MaterialIcons name="home" size={size} color={color} style={styles.iconTab}/>),

            }}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{
                headerShown: false,
                title: '',
                tabBarIcon: ({color, size}) => (

                    <Feather name="search" size={size} color={color} style={styles.iconTab}/>

                )
            }}/>
            <Tab.Screen name="Gender" component={GenderScreen} options={{
                headerShown: false,
                title: '',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="menu-outline" size={size} color={color} style={styles.iconTab}/>
                )
            }}/>
        </Tab.Navigator>
    )
}
export default function App() {
    const [fontsLoaded] = useFonts({
        'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'MuseoModerno-Regular': require('./assets/fonts/MuseoModerno-Regular.ttf'),
        'MuseoModerno-Bold': require('./assets/fonts/MuseoModerno-Bold.ttf'),
    });

    useEffect(() => {
        const prepare = async () => {
            await SplashScreen.preventAutoHideAsync()
        }
        prepare()
    }, [])
    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync()
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Tabs'} component={MyTabs} options={{headerShown: false}}/>
                <Stack.Screen name={'MovieDetails'} component={MovieDetails} options={{headerShown: false}}/>
                <Stack.Screen name={'TvDetails'} component={TvDetails} options={{headerShown: false}}/>
                <Stack.Screen name={'All'} component={All} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    tabBottom: {
        backgroundColor: 'black',
        opacity: 0.9,
        borderTopWidth: 0,
    },
    iconTab: {
        bottom: -10,
    }
})