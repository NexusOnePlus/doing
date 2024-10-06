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
    FlatList,
    InteractionManager
} from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
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
    const [text, setText] = useState('');
    const [allTasks, setAllTasks] = useState(0);
    const [allTasks1, setAllTasks1] = useState<any[]>([]);
    const [allTasks2, setAllTasks2] = useState<any[]>([]);
    const inputRef = useRef<any>(null);
    
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync("black");
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('#000000');
    },[])
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
            setAllTasks(allTasks + 1);
            var hora = getTime();
            // var lista = [...allTasks];
            var tarea = {
                id: task,
                time: hora,
                texto: text,
            }
            if (allTasks1 <= allTasks2) {
                setAllTasks1([...allTasks1, tarea])
            } else {
                setAllTasks2([...allTasks2, tarea])
            }
            setText('');
        }
        setText('');
        setVisible(false);
    };
    const deleteTask = (index: any) => {
        var uno = allTasks1.filter(function (num) {
            return num.id !== index;
        });
        setAllTasks1(uno);
        var dos = allTasks2.filter(function (num) {
            return num.id !== index;
        });
        setAllTasks2(dos);
        setCompleted(completed + 1);
        setTasks(task - 1);
    };
    return (
        <View style={styles.root}>
            <ImageBackground source={wallpaper} style={styles.container}>
                <View style={{ height: '13%', width: '100%', top: 40, flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}> doing </Text>
                    <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>{completed} - <Text style={{ color: 'red' }}>{allTasks}</Text> </Text>
                </View>
                <View style={{ height: '12%', width: '100%', top: 40 }}>
                    <Text style={{ color: 'white', fontSize: 60, textAlign: 'center' }}> {task} </Text>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
                    <Modal visible={visible} transparent animationType="fade"  onShow={() => {
                        setTimeout(() => {
                            inputRef.current.focus();
                            }, 100);
                    }}>
                        <View style={styles.over}>
                            <View style={styles.inside}>
                                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>{getTime()}</Text>
                                <TextInput  ref={inputRef} style={styles.inputreal} multiline maxLength={64} onChangeText={(newText) => setText(newText)} defaultValue={text} />
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
                <View style={{ height: '50%' }}>
                    <FlatList
                        horizontal
                        contentContainerStyle={styles.box}
                        data={allTasks1}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) =>
                            <Pressable onLongPress={() => deleteTask(item.id)}>
                                <View style={styles.cards}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }}>{item.time}</Text>
                                    <View style={{ height: 100, justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>{item.texto}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        }
                    />
                    <FlatList
                        horizontal
                        contentContainerStyle={styles.box}
                        data={allTasks2}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return <Pressable onLongPress={() => deleteTask(item.id)}>
                                <View style={styles.cards}>
                                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }}>{item.time}</Text>
                                    <View style={{ height: 100, justifyContent: 'center' }}>
                                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 }}>{item.texto}</Text>
                                    </View>
                                </View>
                            </Pressable>
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
    root: { flex: 1, height: '100%' },
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
        gap: 10
    },
    box: {
        gap: 20,
        height: '100%',
        padding: 10,
        paddingHorizontal: 20,
    }
});
export default HomeScreen