import {View, Text, SafeAreaView, Image, StyleSheet, ImageBackground, Button, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";

export const MovieDetails = ({navigation, route}) => {
    const {id} = route.params
    const [data, setData] = useState([])
    const fetchMovieDetails = async () => {
        const req = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=1f54bd990f1cdfb230adb312546d765d&language=en-US`)
        const data = await req.json()
        setData(data)
    }
    useEffect(() => {
        fetchMovieDetails()

    }, [])
    return (
           <View style={styles.container}>
               <Image source={{uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`}} style={styles.image}/>
               <View style={styles.contents}>
                   <Text style={styles.title}>{data.title}</Text>
                   <Text style={styles.text}>Release Date : {data.release_date}</Text>
                   <Text style={styles.text}>{data.overview}</Text>
                   <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
                       <Text style={styles.buttonText}>Go Back</Text>
                   </TouchableOpacity>
               </View>
           </View>

    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 500,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#18191A',
        margin: 0
    },
    text: {
        color: '#fff',
        lineHeight: 20,
        marginTop: 10,
    },

    title: {
        color: '#fff',
        fontFamily: 'MuseoModerno-Bold',
        fontSize: 24,
        marginTop: 20,
    },

    contents: {
        margin: 20,
        marginTop: 0
    },
    button: {
        backgroundColor: '#242526',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    }

})