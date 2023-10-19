import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button } from "react-native";
 
export default function AddTodo({submitHandler}) {
    const [text, setText] = useState()

    const changeHandler = (val) => {
        setText(val)
    }

    return (
        <View>
            <TextInput 
                style={styles.input}
                placeholder = 'newTodo...'
                onChangeText ={(val)=> changeHandler(val)}
            />
            <Button onPress={() => submitHandler(text)} title='add todo' color = 'green'/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    }
})