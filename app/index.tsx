import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    StatusBar,
    FlatList
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from "expo-router";

const wallpaper = require('@/assets/images/wallpaper.png')


export interface inota {
    id: number,
    time: string,
    texto: string,
}

const HomeScreen = () => {
    const [visible, setVisible] = useState(false);
    const [task, setTasks] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [text, setText] = useState('')
    const [allTasks, setAllTasks] = useState<any[]>([])
    NavigationBar.setBackgroundColorAsync("black");
    useFocusEffect(
        useCallback(() => {
            // StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#0a0a0a');
        }, [])
    )
    const getTime = () => {
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var hora;
        if (min < 10) {
            hora = hours + ':0' + min;
        } else {
            hora = hours + ':' + min;
        }
        if (hours > 11) {
            hora = hora + ' pm'
        } else {
            hora = hora + ' am'
        }
        return hora;
    }
    const addTask = (props: boolean) => {
        if (props && text.length > 0) {
            setTasks(task + 1);
            var hora = getTime();
            var lista = [...allTasks];
            lista.push({
                id: task,
                time: hora,
                texto: text,
            });
            setAllTasks(lista);
            console.log(allTasks);
            setText('');
        }
        setText('');
        setVisible(false);

    };
    return (
        <View style={styles.root}>
            <StatusBar barStyle={'light-content'} backgroundColor="#0a0a0a" />
            <ImageBackground source={wallpaper} style={styles.container}>
                <View style={{ height: '13%', width: '100%', top: 40}}>
                    <Text style={{ color: 'white', fontSize: 60, textAlign: 'center' }}> doing </Text>
                </View>
                <View style={{ height: '12%', width: '100%', top: 40}}>
                    <Text style={{ color: 'white', fontSize: 60, textAlign: 'center' }}>{completed} - <Text style={{ color: 'red' }}>{task}</Text> </Text>
                </View>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
                    <Modal visible={visible} transparent animationType="fade" >
                        <View style={styles.over}>
                            <View style={styles.inside}>
                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>{getTime()}</Text>
                                <TextInput autoFocus style={styles.inputreal} multiline maxLength={64} onChangeText={(newText) => setText(newText)} defaultValue={text} />
                            </View>
                            <View style={styles.input}>
                                <Pressable style={styles.button} onPress={() => addTask(false)}>
                                    <Text style={styles.text}>x</Text>
                                </Pressable>
                                <Pressable style={styles.button} onPress={() => addTask(true)} >
                                    <Text style={styles.text}>✓</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
                <View style={{height: '50%'}}>
                    <FlatList
                        horizontal
                        contentContainerStyle={styles.box}
                        // numColumns={2}
                        data={allTasks}
                        // keyExtractor={(item) => item.id}
                        renderItem={() =>
                            <View style={styles.cards}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>1</Text>
                            </View>
                        }
                    />
                    <FlatList
                        horizontal
                        contentContainerStyle={styles.box}
                        data={allTasks}
                        // keyExtractor={(item) => item.id}
                        renderItem={(item) => {
                            return <View style={styles.cards}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>2</Text>
                            </View>
                        }
                        }
                    />
                </View>
                <View style={styles.low}>
                    <Pressable style={styles.button} onPress={() => setVisible(true)} >
                        <Text style={styles.text}>+</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    root: { flex: 1, height: '100%'},
    rootow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    over: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25,
    },
    low: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center', fontSize: 25, color: 'white',
    },
    inputreal: {
        textAlign: 'center', fontSize: 25, color: 'white', height: 150
    },
    button: {
        justifyContent: 'center',
        backgroundColor: 'red',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 12,
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        gap: 100,
        bottom: 20
    },
    inside: {
        backgroundColor: '#2a2d2a',
        height: 250,
        width: 250,
        padding: 20,
        borderRadius: 100,
        color: 'white',
        fontSize: 30,
        gap: 25
    },
    cards: {
        backgroundColor: '#2a2d2a',
        height: 165,
        width: 165,
        padding: 20,
        borderRadius: 60,
        color: 'white',
        fontSize: 30,
        gap: 25
    },
    box: {
        gap: 20,
        height: '100%',
        padding: 10,
        paddingHorizontal: 20,
    }
});
export default HomeScreen