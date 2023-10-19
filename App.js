import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./components/header";
import AddTodo from "./components/addtem";
import Sandbox from "./components/sandbox";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", id: "1" },
    { text: "create an app", id: "2" },
    { text: "play the piano", id: "3" },
  ]);

  const [selectedId, setSelectedId] = useState();

  const Item = ({ item, onPress /*backgroundColor,*/ /*textColor*/ }) => (
    <TouchableOpacity
      onPress={onPress}
      /*style={styles.item}*/ /*{[styles.item, {backgroundColor}]}*/
    >
      <View style={styles.title}>
        <MaterialIcons name="delete" size={18} color="black" />
        <Text style={styles.titletext}/*{[styles.title, {color: textColor}]}*/>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  const pressHandler = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  };

  const submitHandler = (text) => {
    if (!text) {
      Alert.alert("Oops", "Todos must not be empty.", [
        {
          text: "Understood",
          onPress: () => {
            console.log("Alert closed");
          },
        },
      ]);
    } else if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text: text, id: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("Oops", "Todos must be over 3 char long ", [
        {
          text: "Understood",
          onPress: () => {
            console.log("Alert closed");
          },
        },
      ]);
    }
  };
  const renderItem = ({ item }) => {
    //const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    //const color = item.id === selectedId ? 'black ' : 'black';

    return (
      <Item
        item={item}
        onPress={() => pressHandler(item.id) /*setSelectedId(item.id)*/}
        // backgroundColor={backgroundColor}
        //textColor={color}
      />
    );
  };

  return (
    //<Sandbox />
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed keyboard");
      }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    padding: 6,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  list: {
    //flex: 1,
    marginTop: 15,
    backgroundColor: 'white',
  },
  title: {
    padding: 10,
    marginTop: 10,
    fontSize: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    flexDirection:'row',
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: `rgb(0, 90, 0)`
  },
  titletext: {
    marginLeft: 10
  }
});
