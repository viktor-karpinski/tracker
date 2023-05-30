import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useGlobalState } from "../GlobalState";
import Colors from "./Colors";

export default function NutritionQuickInfo(props) {
  const { day } = useGlobalState();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setInfo([
      [Math.floor(day.kcal), "kcal"],
      [Math.floor(day.protein) + "g", "protein"],
      [Math.floor(day.carbs) + "g", "carbs"],
      [Math.floor(day.fat) + "g", "fat"],
    ]);
  }, [day]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        props.navigation.navigate("Nutrition");
      }}
    >
      {info.map((prop, key) => {
        return (
          <View key={key} style={styles.info}>
            <Text style={styles.topText}>{prop[0]}</Text>
            <Text style={styles.bottomText}>{prop[1]}</Text>
          </View>
        );
      })}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 2,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  info: {
    width: "45%",
    backgroundColor: Colors().dark_accent,
    borderWidth: 1,
    borderColor: Colors().gray_accent,
    borderRadius: 10,
    padding: 20,
    margin: "2.5%",
  },
  topText: {
    textAlign: "center",
    fontSize: 28,
    color: Colors().text,
    marginBottom: 5,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 20,
    color: Colors().text,
  },
});
