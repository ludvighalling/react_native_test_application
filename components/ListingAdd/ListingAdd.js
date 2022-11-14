import React from 'react';
import type {Node} from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';


function ListingAdd(props) {
    const styles = StyleSheet.create({
        listingAdd: {
            width: "95%",
            marginLeft: "2.5%",
            marginBottom: "2.5%",
            flexDirection: "row",
            backgroundColor: "#b0b0b0",
            height: 200,
            maxHeight: "20%",
            borderRadius: 5
        },
        image: {
            flex: 1,
            height: 200,
            maxHeight: "100%",
            resizeMode: "cover",
            borderRadius: 5
        },
        info: {
            flex: 1
        },
        addName: {
            fontSize: 20,
            color: "black",
            textAlign: "center"
        },
        price: {
            color: "green",
            textAlign: "center"
        }
    });

    return(
        <View style={styles.listingAdd} >
            <Image style={styles.image} source={props.imgRequire}/>
            <View style={styles.info}>
                <Text style={styles.addName} >{props.addName}</Text>
                <Text style={styles.price} >{props.price}kr</Text>
            </View>
        </View>
    );
}

export {
    ListingAdd
}