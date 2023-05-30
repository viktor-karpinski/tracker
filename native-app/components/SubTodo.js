import { useRef, useState } from "react";
import { Pressable, Text, Animated, StyleSheet, Easing } from "react-native";
import api from "../fetch";
import { useGlobalState } from "../GlobalState";
import Colors from "./Colors";

export default function SubTodo(props) {
  const check = () => {
    setChecked(!checked);
    if (!props.detail) {
      setTimeout(() => {
        Animated.timing(h, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
        Animated.timing(mt, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, 250);
    }
    api("todo/complete/" + props.id, "put", (data) => {
      if (!props.detail) {
        setTimeout(() => {
          todo.forEach((element) => {
            if (element.id === props.parent) {
              element.todos.forEach((sub) => {
                if (sub.id === props.id) {
                  sub.completed = 1;
                }
              });
            }
          });
          setTodo(todo);
        }, 400);
      } else {
        setTodo(data.todos);
      }
    });
  };

  const { todo, setTodo } = useGlobalState();

  const [checked, setChecked] = useState(props.completed === 0 ? false : true);

  const rootViewRef = useRef(null);

  const [h, setH] = useState(new Animated.Value(1));
  const [ch, setCh] = useState(100);
  const [mt, setMt] = useState(new Animated.Value(15));

  const maxHeight = h.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ch],
  });

  return (
    <Animated.View
      style={[styles.row, styles.subRow, { maxHeight }, { marginTop: mt }]}
      ref={rootViewRef}
      onLayout={(event) => {
        var { height } = event.nativeEvent.layout;
        setCh(height);
      }}
    >
      <Pressable
        style={
          !checked
            ? [styles.checkbox, styles.subCheckbox]
            : [styles.checkbox, styles.subCheckbox, styles.checkboxChecked]
        }
        onPress={check}
      ></Pressable>
      <Pressable
        onPress={() => {
          if (props.detail) {
            props.navigation.navigate("EditSubTodo");
          }
        }}
      >
        <Text style={!checked ? styles.text : styles.textChecked}>
          {props.title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  subRow: {
    marginLeft: "11.5%",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: Colors().dark_accent,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors().gray_accent,
  },
  checkboxChecked: {
    borderColor: Colors().background,
  },
  subCheckbox: {
    marginRight: 14,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
    paddingRight: "19%",
    lineHeight: 22,
  },
  textChecked: {
    color: "#ffffff",
    textDecorationLine: "line-through",
    fontSize: 16,
  },
});
