import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';

import React from "react";
const wallpaper = require('@/assets/images/wallpaper.png')

NavigationBar.setBackgroundColorAsync("black");

const HomeScreen = () => {
    return (
        <View style={styles.root}>
            <StatusBar style="light" backgroundColor="black"/>
             <ImageBackground source={wallpaper} style={styles.container}>
                <Text style={styles.text} >Hola</Text>
             </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    root: {flex: 1},
    container: {
        flex: 1, justifyContent: 'center',
    },
    text: {
        textAlign: 'center', fontSize: 25, color: 'white',
    }
});
export default HomeScreen