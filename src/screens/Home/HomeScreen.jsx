import {View, Text, SafeAreaView, StyleSheet, ScrollView} from "react-native";
import {TopReatedMoovies} from "../../components/TopReatedMoovies/TopReatedMoovies";
import {TopReatedTv} from "../../components/TopReatedTv/TopReatedTv";
import {PopularMoovies} from "../../components/PopularMoovie/PopularMoovies";
import {PopularTv} from "../../components/PopularTv/PopularTv";


export const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <TopReatedMoovies navigation={navigation}/>
                <PopularMoovies navigation={navigation}/>
                <TopReatedTv navigation={navigation}/>
                <PopularTv navigation={navigation}/>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor : '#18191A',
        paddingBottom: 20
    },

})