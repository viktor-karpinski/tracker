import { StyleSheet, Text } from "react-native";

export default function Heading(props) {
  return <Text style={styles.heading}>{props.text}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    color: "#ffffff",
    marginBottom: 10,
  },
});
