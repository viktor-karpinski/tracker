import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";
import api from "../fetch";
import { useGlobalState } from "../GlobalState";
import Colors from "./Colors";
import { Audio } from "expo-av";
import SubTodo from "./SubTodo";

export default function Todo(props) {
  const [checked, setChecked] = useState(
    props.todo.completed === 0 ? false : true
  );
  const { setTodo, setSelectedTodo } = useGlobalState();

  const [h, setH] = useState(new Animated.Value(1));
  const [p, setP] = useState(new Animated.Value(15));
  const [b, setB] = useState(new Animated.Value(1));
  const [mb, setMb] = useState(new Animated.Value(8));
  const [ch, setCh] = useState(100);

  const [sound, setSound] = useState("");

  useEffect(() => {
    async function loadSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/gun.mp3")
      );
      setSound(sound);
    }
    loadSound();
  }, []);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  async function check() {
    let subbed = false;

    props.subTodos.forEach((todo) => todo.completed === 0 && (subbed = true));

    if (!subbed) {
      let route = props.todo.completed === 0 ? "complete/" : "un/complete/";
      setChecked(!checked);
      playSound();

      if (props.todo.completed === 0) {
        setTimeout(() => {
          Animated.timing(h, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          Animated.timing(p, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          Animated.timing(b, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          Animated.timing(mb, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
        }, 300);
      }
      api("todo/" + route + props.todo.id, "put", () => {});
    }
  }

  const rootViewRef = useRef(null);

  const maxHeight = h.interpolate({
    inputRange: [0, 1],
    outputRange: [0, ch],
  });

  return (
    <Animated.View
      ref={rootViewRef}
      onLayout={(event) => {
        let sub = 1;
        props.subTodos.forEach((todo) => {
          if (todo.completed === 0) sub++;
        });
        var { height } = event.nativeEvent.layout;
        setCh(height * sub);
      }}
      style={[
        styles.todo,
        { maxHeight, paddingVertical: p, borderWidth: b, marginBottom: mb },
      ]}
    >
      <Pressable
        onPress={() => {
          setSelectedTodo(props.todo);
          props.navigation.navigate("TodoDetails");
        }}
      >
        <View style={styles.row}>
          <Pressable
            style={
              !checked
                ? styles.checkbox
                : [styles.checkbox, styles.checkboxChecked]
            }
            onPress={check}
          ></Pressable>
          <Text style={styles.vpoints}>#{props.todo.vpoints}</Text>
          <Text style={!checked ? styles.text : styles.textChecked}>
            {props.todo.title}
          </Text>
        </View>
        {props.subTodos.length > 0 &&
          props.subTodos.map((prop, key) => {
            return (
              prop.completed === 0 && (
                <SubTodo
                  key={key}
                  title={prop.title}
                  id={prop.id}
                  parent={props.todo.id}
                  completed={prop.completed}
                  detail={false}
                />
              )
            );
          })}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  todo: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors().background,
    borderRadius: 10,
    marginBottom: 8,

    borderWidth: 1,
    borderColor: Colors().gray_accent,

    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  subRow: {
    marginTop: 15,
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
    //backgroundColor: Colors().gray_accent,
    borderColor: Colors().background,
  },
  subCheckbox: {
    marginRight: 14,
    marginBottom: 5,
  },
  vpoints: {
    color: Colors().gray_accent,
    marginRight: 10,
    width: 30,
    textAlign: "center",
    fontSize: 16,
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
