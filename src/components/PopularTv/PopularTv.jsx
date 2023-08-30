import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {Link} from "@react-navigation/native";

export const PopularTv = ({navigation}) => {
    const [data, setData] = useState([])
    const fetchPopularTv = async () => {
        const req = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US')
        const res = await req.json()
        setData(res.results)
    }
    useEffect(()=> {
        fetchPopularTv()
    }, [])
    const handlePress = (item) => {
        navigation.navigate('TvDetails' , {id: item.id})
    }
    return (
        <View>

            <View style={styles.header}>
                <Text style={styles.title}>Popular Tv</Text>
                <Link to={'/All?type=tv&category=popular'} style={styles.link}>See All</Link>
            </View>

            <FlatList data={data} renderItem={({item}) => (
                <View>
                   <TouchableOpacity onPress={()=> handlePress(item)}>
                       <Image style={styles.image}
                              source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
                   </TouchableOpacity>
                </View>
            )}
                      keyExtractor={(item) => item.id}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 300,
        margin: 10,
        borderRadius: 20,
        objectFit: 'cover'
    },
    title: {
        color: '#fff',
        fontFamily: 'MuseoModerno-Bold',
        fontSize: 30,
        margin: 20,
        marginBottom: 5
    },
    header:{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent : 'space-between'
    },
    link:{
        color: 'gray',
        marginTop: 20,
        marginRight: 20,
        fontFamily: 'Roboto-Light'
    }
})