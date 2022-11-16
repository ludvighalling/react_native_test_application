import React from 'react';
import type {Node} from 'react';
import { ToastAndroid, Button, Text, TextInput, View, ScrollView, Image, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListingAdd } from "./components/ListingAdd"
import { Observer } from "mobx-react"
import { addList } from "./ListingAdds"

import { IMG_DEFAULT } from './resourse/images';

import { launchCamera } from "react-native-image-picker"

function HomeView({navigation}) {
  const styles = StyleSheet.create({
    homeView: {
      flex: 1
    },
    homeText: {
      flex: 1,
      fontSize: 26,
      color: "black",
      textAlign: "center",
      textAlignVertical: "center"
    },
    latestAdds: {
      flex: 3
    },
    lastAddsText: {
      color: "black",
      fontSize: 20
    }
  });

  return (
    <View style={styles.homeView}>
      <Text style={styles.homeText}>Welcome to the add listing application</Text>
        <Button title="Create add listing" onPress={() => navigation.navigate("CreateAddView")}/>
      <View style={styles.latestAdds}>
        <Text style={styles.lastAddsText}>Last 3 adds:</Text>
        <Observer>
          {() => {
            if (addList.listOfAdds.length == 0) {
              return(
                <Text>There are no adds to display</Text>
                )
              }
              return(
                addList.listOfAdds.slice().reverse().slice(0, 3).map((element) => <ListingAdd key={element.key} imgRequire={element.imgPath} addName={element.name} price={element.price} />)
                )
              }}
        </Observer>
        <Button title="View all listings" onPress={() => navigation.navigate("AddView")}/>
      </View>
    </View>
  );
}

function CreateAddView() {
  const styles = StyleSheet.create({
    createAddView: {
      flex: 1
    },
    text: {
      textAlign: "center",
      fontFamily: "Arial",
      paddingTop: 40,
      fontSize: 20,
      color: "black"
    },
    nameInput: {
      marginTop: 5,
      width: "98%",
      marginLeft: "1%",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5
    },
    priceInput: {
      marginTop: 5,
      marginBottom: 5,
      marginLeft: "1%",
      width: "98%",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 5,
      color: "green"
    }
  });

  var addName = "";
  var addPrice = "";
  var addImg = IMG_DEFAULT;
  
  return (
    <View style={styles.createAddView}>
      <Text style={styles.text}>Create an add on this page</Text>
      <TextInput style={styles.nameInput} placeholder='Name of add' onChangeText={textInput => {addName = textInput; console.log(addName)}}></TextInput>
      <TextInput style={styles.priceInput} placeholder='Price in SEK' keyboardType='numeric' onChangeText={textInput => {addPrice = textInput; console.log(addPrice)}}></TextInput>
      <Button title="add image" onPress={ () => {
          const result = launchCamera("", (result_obj) => {
            console.log(result_obj);
            if (result_obj["didCancel"] == true) {
              addImg = IMG_DEFAULT;
            }
            else {
              addImg = {"uri": result_obj["assets"][0]["uri"]};
              console.log(addImg);
            }
          });

        } 
      } />
      <Button title='Create add listing' onPress={() => { 
        if (addName == "" || addPrice == "") {
          ToastAndroid.show("Both name and price must be filled to create an add.", ToastAndroid.SHORT);
        }
        else {
          addList.addToList(addName, addPrice, addImg); addImg = IMG_DEFAULT;
          ToastAndroid.show("Add created", ToastAndroid.SHORT);
        }
        }
      }/>
    </View>
  );
}

function BrowseAddsView() {
  return (
    <ScrollView>
      <Observer>
        {() => {
          return(
            addList.listOfAdds.map((element) => <ListingAdd key={element.key} imgRequire={element.imgPath} addName={element.name} price={element.price} />)
          )
        }}
      </Observer>
    </ScrollView>
  );
}

const App: () => Node = () => {

  const BottomTabNav = createBottomTabNavigator();

  return (

    <NavigationContainer>  
      <BottomTabNav.Navigator initialRouteName='HomeView' barStyle={{backgroundColor: '#5b92eb'}} screenOptions={{tabBarIconStyle: { display: "none" }}}>
        <BottomTabNav.Screen name="HomeView" component={HomeView} options={{ title: "HOME"}} />
        <BottomTabNav.Screen name="CreateAddView" component={CreateAddView} options={{ title: "CREATE ADD"}} />
        <BottomTabNav.Screen name="AddView" component={BrowseAddsView} options={{ title: "ADDS"}} />
      </BottomTabNav.Navigator>

    </NavigationContainer>
  );
};

export default App;
