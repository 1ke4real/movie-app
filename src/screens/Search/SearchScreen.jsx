import {View, Text, SafeAreaView, StyleSheet, Button, TouchableOpacity, TextInput, FlatList, Image} from "react-native";
import {useEffect, useState} from "react";

export const SearchScreen = ({navigation}) => {
    const [search, setSearch] = useState('')
    const[data, setData] = useState([])
    const handleSearch = async (search) => {
        if (search.length > 3) {
            const req = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&query=${search}`)
            const data = await req.json()
            setData(data.results)
            const req2 = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&query=${search}`)
            const data2 = await req2.json()
            setData(data.results)
        }
    }
    const handleChoose = (item) => {
        if (item.hasOwnProperty('name')){
            navigation.navigate('TvDetails' , {id: item.id})
        }
        if (item.hasOwnProperty('title')){
            navigation.navigate('MovieDetails' , {id: item.id})
        }
    }
    useEffect(() => {
        handleSearch(search)
    }, [search])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search a Movie or Tv</Text>
            <TextInput style={styles.input} placeholder={'Search ...'} onChangeText={(text) => setSearch(text)} placeholderTextColor={'#fff'}/>
            {data.length > 0 && (
                <FlatList data={data} renderItem={({item}) => (
                    <View style={styles.searchcontainer}>
                        <TouchableOpacity onPress={()=>handleChoose(item)}>
                            <Image style={styles.image}
                                   source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
                        </TouchableOpacity>
                    </View>
                )}
                          keyExtractor={(item) => item.id}
                />
            )}
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
    text: {
        color: '#fff',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 20,
        margin: 20,
    },
    textBnt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#242526',
        width: '50%',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        backgroundColor: '#242526',
        padding: 20,
        borderRadius: 10,
        margin: 20,
        color: '#fff',
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 20,
        margin: 10,

    },
    searchcontainer: {
        alignItems: 'center',
    }
})