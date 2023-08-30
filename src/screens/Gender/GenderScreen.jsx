import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView} from "react-native";
import {useEffect, useState} from "react";

export const GenderScreen = ({navigation}) => {
    const [genderMovies, setGenderMovies] = useState([])
    const [genderTv, setGenderTv] = useState([])
    const fetchGender = async () => {
        const reqMovie = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=1f54bd990f1cdfb230adb312546d765d`)
        const dataMovie = await reqMovie.json()
        setGenderMovies(dataMovie.genres)
        const reqTv = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=1f54bd990f1cdfb230adb312546d765d`)
        const dataTv = await reqTv.json()
        setGenderTv(dataTv.genres)

    }
    useEffect(() => {
        fetchGender()
        console.log(genderMovies)
    }, [])
    const handleMovie = (item) => {
        navigation.navigate(`All`, {discover: 'discover', type: 'movie', genre: `${item.id}`, nameGenre: `${item.name}`})
    }
    const handleTv = (item) => {
        navigation.navigate(`All`, {discover: 'discover', type: 'tv', genre: `${item.id}`, nameGenre: `${item.name}`})
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select a gender</Text>
            <ScrollView  contentInsetAdjustmentBehavior="automatic">
                <Text style={styles.subtitle}>Gender's movies</Text>
                <FlatList data={genderMovies} renderItem={({item}) => (
                    <View>
                        <TouchableOpacity onPress={() => handleMovie(item)} style={styles.btn}>
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )} keyExtractor={(item) => item.id}
                />
                <Text style={styles.subtitle}>Gender's tv</Text>
                <FlatList data={genderTv} renderItem={({item}) => (
                    <View>
                        <TouchableOpacity onPress={() => handleTv(item)} style={styles.btn}>
                            <Text style={styles.text}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                )} keyExtractor={(item) => item.id}
                />
            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#18191A',
        height: '100%'
    },
    title: {
        color: '#fff',
        fontFamily: 'MuseoModerno-Bold',
        fontSize: 30,
        margin: 20,
        marginBottom: 5,
        textAlign: 'center'
    },
    subtitle: {
        color: '#fff',
        fontFamily: 'MuseoModerno-Regular',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Roboto-Light',
        textAlign: 'center'
    },
    btn: {
        backgroundColor: '#242526',
        margin: 10,
        padding: 10,
        borderRadius: 10
    }
})