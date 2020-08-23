import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = (props) => {
    const [data,setData] = useState([])
    const[loading, setLoading]= useState(true)
    const fetchData = () => {
        fetch("http://192.168.1.3:3000/")
        .then(res=>res.json())
        .then(data=>{ setData(data),setLoading(false) })
        .catch(err=>{
            Alert.alert("Something went wrong")
        })
    }
    useEffect(()=>{
        fetchData();
    },[])
    const renderList = ((items) => {
        return (
            <Card style={styles.mycard} onPress={()=>props.navigation.navigate("Profile",{items})}>
                <View style={styles.cardView}>
                    <Image style={styles.myImage} source={{ uri: items.picture }} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}>{items.name}</Text>
                        <Text>{items.position}</Text>
                    </View>
                </View>
            </Card>

        )
    })
    
    return (
        <View style={{flex: 1}}>
            {/* {renderList} */}
            {loading ? <ActivityIndicator size="large" color="#0000ff" />: 
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={item => item._id}
                onRefresh={()=>fetchData()}
                refreshing={loading} />}
            
            <FAB
                style={styles.myfab}
                small={false}
                icon="plus"
                theme={{colors:{accent: "#006aff"}}}
                onPress={() => props.navigation.navigate("Create")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mycard: {
        margin: 5
    },
    myImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    cardView: {
        flexDirection: "row",
        padding: 6
    },
    text: {
        fontSize: 22
    },
    myfab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})

export default Home;