import { StyleSheet, View, TextInput, Text } from "react-native";
import Colors from "./Colors";

export default function Textarea(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        multiline
        numberOfLines={8}
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
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 10,
    minHeight: 90,
    color: Colors().text,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  label: {
    color: Colors().text,
    fontSize: 18,
    marginBottom: 12,
  },
});
