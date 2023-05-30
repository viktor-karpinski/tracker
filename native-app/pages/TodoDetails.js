import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import Container from "../components/Container";
import api from "../fetch";
import { useGlobalState } from "../GlobalState";
import Colors from "../components/Colors";
import SubTodo from "../components/SubTodo";

const TodoDetails = ({ navigation, route }) => {
  const { selectedTodo, todo, setTodo, setResetTodo, resetTodo } =
    useGlobalState();
  const [subTodo, setSubTodo] = useState("");
  const [checked, setChecked] = useState(
    selectedTodo.completed === 0 ? false : true
  );

  const addSubTodo = () => {
    api(
      "todo",
      "post",
      (data) => {
        selectedTodo.todos.push({ title: subTodo, completed: 0 });
        setSubTodo("");
        todo.forEach((element) => {
          element.id === selectedTodo.id && (element = selectedTodo);
        });
        setResetTodo(!resetTodo);
      },
      JSON.stringify({
        title: subTodo,
        todo_id: selectedTodo.id,
      })
    );
  };

  const check = () => {
    let route = selectedTodo.completed === 0 ? "complete/" : "un/complete/";
    setChecked(!checked);
    console.log(route);
  };

  return (
    <Container>
      <View style={styles.extraWrapper}>
        <Text style={styles.vpoints}>#{selectedTodo.vpoints}</Text>
        <Text style={styles.deadline}>
          {selectedTodo.deadline !== null &&
            selectedTodo.deadline.split(" ")[0]}
        </Text>
      </View>

      {selectedTodo.description !== null && (
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{selectedTodo.description}</Text>
        </View>
      )}

      <View style={styles.top}>
        <Pressable
          style={
            checked
              ? [styles.checkbox, { borderColor: Colors().background }]
              : styles.checkbox
          }
          onPress={() => {
            check();
          }}
        ></Pressable>
        <Text
          style={
            checked
              ? [styles.heading, { textDecorationLine: "line-through" }]
              : styles.heading
          }
        >
          {selectedTodo.title}
        </Text>
      </View>

      {selectedTodo.todos.length > 0 &&
        selectedTodo.todos.map((prop, key) => {
          return (
            <SubTodo
              key={key}
              title={prop.title}
              id={prop.id}
              parent={selectedTodo.id}
              completed={prop.completed}
              detail={true}
              navigation={navigation}
            />
          );
        })}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add Sub-Todo"
          placeholderTextColor={Colors().gray_accent}
          value={subTodo}
          onChangeText={setSubTodo}
        />
        <Pressable
          style={styles.subTodoAdd}
          onPress={() => {
            addSubTodo();
          }}
        >
          <Text style={styles.subTodoAddText}>+</Text>
        </Pressable>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  top: {
    margin: 20,
    marginTop: 20,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
  },
  heading: {
    color: Colors().text,
    fontSize: 20,
  },
  vpoints: {
    color: Colors().gray_accent,
    marginRight: 10,
    width: 100,
    fontSize: 20,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: Colors().dark_accent,
    marginRight: 15,
    borderWidth: 1,
    borderColor: Colors().gray_accent,
  },
  descriptionWrapper: {
    backgroundColor: Colors().background,
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors().gray_accent,
  },
  description: {
    fontSize: 16,
    color: Colors().text,
  },

  extraWrapper: {
    margin: 20,
    marginTop: 10,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deadline: {
    color: Colors().gray_accent,
    fontSize: 20,
  },

  subTodo: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
    padding: 9,
    paddingLeft: 40,
  },

  input: {
    backgroundColor: Colors().dark_accent,
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    width: "83%",
    color: Colors().text,
  },

  addContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 60,
  },

  subTodoAdd: {
    backgroundColor: Colors().color_accent,
    padding: 6,
    borderRadius: 10,
    width: "15%",
  },

  subTodoAddText: {
    color: Colors().text,
    fontSize: 20,
    textAlign: "center",
  },
});

export default TodoDetails;
