import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "./Colors";

export default function Button(props) {
  return (
    <Pressable style={styles.button} onPress={props.press}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors().color_accent,
    margin: 20,
    padding: 15,
    borderRadius: 10,
    marginBottom: 80,
  },
  text: {
    backgroundColor: "transparent",
    color: Colors().text,
    fontSize: 16,
    textAlign: "center",
  },
});
