import Container from "../components/Container";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Colors from "../components/Colors";

import api from "../fetch";
import { useGlobalState } from "../GlobalState";

const EatFood = ({ navigation }) => {
  const { food, setEaten, setDay, date } = useGlobalState();
  const [inputs, setInputs] = useState([]);

  const eat = (id, key) => {
    api(
      "food/eat",
      "post",
      (data) => {
        let newInputs = [...inputs];
        newInputs[key] = "";
        setInputs(newInputs);
        setDay(data.day);
        setEaten(data.food);
      },
      JSON.stringify({
        food_id: id,
        factor: inputs[parseInt(key)],
        date: date,
      })
    );
  };

  useEffect(() => {
    let arr = [];
    Object.entries(food).map((prop, key) => {
      arr.push("");
    });
    setInputs(arr);
  }, []);

  return (
    <Container>
      <View style={styles.container}>
        {Object.entries(food).map((prop, key) => {
          return (
            <View style={styles.food} key={key}>
              <Text style={styles.text}>
                {prop[1].name}, {prop[1].serving}
              </Text>
              <View style={styles.aside}>
                <TextInput
                  placeholderTextColor={Colors().background}
                  style={styles.input}
                  placeholder="1"
                  defaultValue={inputs[key]}
                  onChangeText={(text) => {
                    let newInputs = [...inputs];
                    newInputs[key] = text;
                    setInputs(newInputs);
                  }}
                />
                <Pressable
                  style={styles.button}
                  onPress={() => eat(prop[1].id, key)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </Container>
  );
};

/*

<View style={styles.aside}>
                <TextInput
                  placeholderTextColor={Colors().background}
                  style={styles.input}
                  placeholder="1"
                  defaultValue={inputs[key]}
                  onChangeText={(text) => {
                    let newInputs = [...inputs];
                    newInputs[key] = text;
                    setInputs(newInputs);
                  }}
                />
                <Pressable
                  style={styles.button}
                  onPress={() => eat(prop[1].id, key)}
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>

*/

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  food: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors().dark_accent,
    borderWidth: 1,
    borderColor: Colors().background,
    borderRadius: 10,
    marginBottom: 10,
  },
  aside: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Colors().text,
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors().gray_accent,
    padding: 10,
    borderRadius: 10,
    width: 40,
    fontSize: 14,
    color: Colors().text,
  },
  button: {
    padding: 5,
    marginLeft: 10,
    backgroundColor: Colors().color_accent,
    borderRadius: 10,
    width: 40,
  },
  buttonText: {
    fontSize: 22,
    paddingBottom: 2,
    textAlign: "center",
    color: Colors().text,
  },
});

export default EatFood;
