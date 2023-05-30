import { StyleSheet, View, TextInput, Text } from "react-native";
import Colors from "./Colors";

export default function Input(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        placeholderTextColor={Colors().gray_accent}
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    padding: 15,
  },
  input: {
    backgroundColor: Colors().dark_accent,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: Colors().text,
    borderRadius: 10,
    fontSize: 16,
  },
  label: {
    color: Colors().text,
    fontSize: 18,
    marginBottom: 12,
  },
});
