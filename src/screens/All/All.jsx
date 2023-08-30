import {Text, SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import { Ionicons } from '@expo/vector-icons'

export const All = ({navigation, route}) => {
    const {type} = route.params
    const {category} = route.params
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const  {discover} = route.params
    const {genre} = route.params
    const {nameGenre} = route.params
    console.log('genreid', genre)
    console.log(nameGenre)
    const handleData = async () => {
       if (discover){
           const req = await fetch(`https://api.themoviedb.org/3/${discover}/${type}/?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&with_genres=${genre}&page=${page}`)
           const data = await req.json()
           console.log(data)
           setData((prev) => [...prev, ...data.results])
       }else {
           const req = await fetch(`https://api.themoviedb.org/3/${type}/${category}?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US&page=${page}`)
           const data = await req.json()
           console.log(data)
           setData((prev) => [...prev, ...data.results])
       }
        setTotalPages(data.total_pages)
    }
    useEffect(() => {
        handleData()
    }, [page]);
    const handleNewPage = (end) => {
        if (page <= totalPages) {
            if (end === 0) {
                setPage(page + 1)
            }
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
    return (
        <SafeAreaView style={styles.container}>
           <View style={{flexDirection: "row", alignItems: 'center'}}>
               <TouchableOpacity style={{ marginTop:15, marginLeft:10}} onPress={()=>navigation.goBack()}>
                   <Ionicons name="arrow-back" size={24} color="white" />
               </TouchableOpacity>
               {category === 'top_rated' && type === 'movie' && <Text style={styles.title}>Top Reated Movie</Text>}
               {category === 'popular' && type === 'movie' && <Text style={styles.title}>Popular Movie</Text>}
               {category === 'top_rated' && type === 'tv' && <Text style={styles.title}>Top Reated Tv</Text>}
               {category === 'popular' && type === 'tv' && <Text style={styles.title}>Popular Tv</Text>}
               {discover && type === 'movie' && <Text style={styles.title}>{nameGenre} Movie</Text>}
               {discover && type === 'tv' && <Text style={styles.title}>{nameGenre} Tv</Text>}

           </View>
            <FlatList data={data} renderItem={({item}) => (
                <View style={styles.searchcontainer}>
                    <TouchableOpacity onPress={()=>handleChoose(item)}>
                        <Image style={styles.image}
                               source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
                    </TouchableOpacity>
                </View>
            )}
                      keyExtractor={(item) => item.id.toString()}
                      onEndReached={({distanceFromEnd}) => {
                          handleNewPage(distanceFromEnd)
                          console.log(distanceFromEnd)
                      }}
                      onScrollToTop={() => console.log('scroll to top')}
                      ListFooterComponent={() => (<ActivityIndicator size={"large"}/>)}
            />
        </SafeAreaView>
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
    }, container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#18191A',
        paddingBottom: 20
    },
    searchcontainer: {
        alignItems: 'center',
    }
})