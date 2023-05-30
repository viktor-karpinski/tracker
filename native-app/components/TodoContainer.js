import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import Colors from "./Colors";
import Todo from "./Todo";
import { useGlobalState } from "../GlobalState";
import api from "../fetch";

export default function TodoContainer(props) {
  const { todo, resetTodo, setTodo } = useGlobalState();
  const [filter, setFilter] = useState(0);

  const runFilter = (id) => {
    setFilter(id);
  };

  useEffect(() => {
    api("todos", "get", (data) => {
      setTodo(data.todos);
    });
  }, [resetTodo]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.heading}>ToDo</Text>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.button}
            onPress={() => {
              props.navigation.navigate("AddTodo");
            }}
          >
            <Image
              source={require("./../assets/add.png")}
              style={styles.icon}
            ></Image>
          </Pressable>
          <Pressable style={styles.button}>
            <Image
              source={require("./../assets/settings.png")}
              style={styles.icon}
            ></Image>
          </Pressable>
        </View>
      </View>

      <View style={styles.filterBox}>
        <Pressable
          onPress={() => runFilter(0)}
          style={
            filter === 0
              ? [styles.filterButton, styles.filterSelected]
              : styles.filterButton
          }
        >
          <Text style={styles.filterText}>all todos</Text>
        </Pressable>
        <Pressable
          onPress={() => runFilter(1)}
          style={
            filter === 1
              ? [styles.filterButton, styles.filterSelected]
              : styles.filterButton
          }
        >
          <Text style={styles.filterText}>due today</Text>
        </Pressable>
        <Pressable
          onPress={() => runFilter(2)}
          style={
            filter === 2
              ? [styles.filterButton, styles.filterSelected]
              : styles.filterButton
          }
        >
          <Text style={styles.filterText}>completed</Text>
        </Pressable>
      </View>

      {Object.entries(todo).map((prop, key) => {
        if (filter !== 1 && filter !== 2 && prop[1].completed !== 1)
          return (
            <Todo
              key={key}
              subTodos={prop[1].todos || []}
              todo={prop[1]}
              navigation={props.navigation}
            ></Todo>
          );
        else if (filter === 2 && prop[1].completed === 1)
          return (
            <Todo
              key={key}
              title={prop[1].title}
              vpoints={prop[1].vpoints}
              subTodos={prop[1].todos || []}
              completed={prop[1].completed}
              todo={prop[1]}
              navigation={props.navigation}
            ></Todo>
          );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 40,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    color: Colors().text,
    fontSize: 30,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  button: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },

  filterBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  filterButton: {
    padding: 10,
    width: "31%",
    backgroundColor: Colors().dark_accent,
    borderRadius: 10,
    opacity: 0.5,
  },
  filterSelected: {
    opacity: 1,
  },
  filterText: {
    fontSize: 16,
    color: Colors().text,
    textAlign: "center",
  },
});
