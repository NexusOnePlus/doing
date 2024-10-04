import { View, Text, ImageBackground, StyleSheet, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from 'expo-navigation-bar';

import React from "react";
const wallpaper = require('@/assets/images/wallpaper.png')

NavigationBar.setBackgroundColorAsync("black");

const HomeScreen = () => {
    return (
        <View style={styles.root}>
            <StatusBar style="light" backgroundColor="black" />
            <ImageBackground source={wallpaper} style={styles.container}>
                <View style={styles.rootow}>
                <Text style={styles.text} >Hola</Text>
                </View>
                <View style={styles.low}>
                    <Pressable style={styles.button} >
                        <Text style={styles.text}>+</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    root: { flex: 1 },
    rootow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    low: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1, justifyContent: 'center',
    },
    text: {
        textAlign: 'center', fontSize: 25, color: 'white',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 12,
        elevation: 3,
    }
});
export default HomeScreen