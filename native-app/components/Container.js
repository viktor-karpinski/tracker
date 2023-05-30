import { StyleSheet, ScrollView } from "react-native";
import Colors from "./Colors";

export default function Container({ children }) {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors().background,
    height: "100%",
  },
});
