import Container from "../components/Container";
import Input from "../components/Input";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Colors from "../components/Colors";

import api from "../fetch";
import { useGlobalState } from "../GlobalState";

const AddFood = ({ navigation }) => {
  const { setFood } = useGlobalState();

  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [saturatedFat, setSaturatedFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [salt, setSalt] = useState("");
  const [sugar, setSugar] = useState("");
  const [fibre, setFibre] = useState("");
  const [serving, setServing] = useState("");

  const save = () => {
    api(
      "food",
      "post",
      (data) => {
        console.log("AddFood Saving", data);
        setFood(data.food);
        navigation.goBack();
      },
      JSON.stringify({
        name: name,
        serving: serving,
        kcal: kcal,
        protein: protein,
        fat: fat,
        saturated_fat: saturatedFat,
        carbs: carbs,
        fibre: fibre,
        sugar: sugar,
        salt: salt,
      })
    );
  };

  return (
    <Container style={styles.container}>
      <Input
        label="What are you eating?"
        placeholder="Milk"
        value={name}
        setValue={setName}
      />
      <Input
        label="Set Serving"
        placeholder="100g"
        value={serving}
        setValue={setServing}
      />
      <Input
        label="How many kcal does it have?"
        placeholder="420kcal"
        value={kcal}
        setValue={setKcal}
      />
      <Input
        label="How much protein does it have?"
        placeholder="33g"
        value={protein}
        setValue={setProtein}
      />
      <Input
        label="How much fat does it have?"
        placeholder="22g"
        value={fat}
        setValue={setFat}
      />
      <Input
        label="How much saturated fat does it have?"
        placeholder="11g"
        value={saturatedFat}
        setValue={setSaturatedFat}
      />
      <Input
        label="How much fibre does it have?"
        placeholder="0.1g"
        value={fibre}
        setValue={setFibre}
      />
      <Input
        label="How many carbs does it have?"
        placeholder="0g"
        value={carbs}
        setValue={setCarbs}
      />
      <Input
        label="How much of it is sugar?"
        placeholder="2g"
        value={sugar}
        setValue={setSugar}
      />
      <Input
        label="How much salt does it have?"
        placeholder="0.1g"
        value={salt}
        setValue={setSalt}
      />
      <Button text="Save Food" press={save} />
    </Container>
  );
};

const styles = StyleSheet.create({
  calendar: {
    margin: 20,
    borderRadius: 10,
  },
  label: {
    color: Colors().text,
    fontSize: 18,
    marginTop: 16,
    marginLeft: 20,
  },
});

export default AddFood;
