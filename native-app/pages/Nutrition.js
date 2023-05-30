import Container from "../components/Container";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Colors from "../components/Colors";

import api from "../fetch";
import Week from "../components/Week";
import { useGlobalState } from "../GlobalState";

const Nutrition = ({ navigation, route }) => {
  const { day, eaten } = useGlobalState();

  const save = () => {
    api(
      "todo",
      "post",
      (data) => {
        console.log(data);
        navigation.navigate("Home", { todo: true });
      },
      JSON.stringify({
        title: title,
        deadline: Object.keys(chosenDate)[0],
        description: description,
        vpoints: vpoints,
      })
    );
  };

  return (
    <Container style={styles.container}>
      <Week></Week>
      <View style={[styles.infoRow, styles.top]}>
        <View style={styles.between}>
          <Text style={styles.nameText}>kcal</Text>
          <Text style={styles.infoText}>
            {Math.round(day.kcal * 100) / 100 || 0}
          </Text>
        </View>
        <View style={styles.between}>
          <Text style={styles.nameText}>protein</Text>
          <Text style={styles.infoText}>
            {Math.round(day.protein * 100) / 100 || 0}g
          </Text>
        </View>
      </View>

      <View style={[styles.infoRow, styles.noBG]}>
        <View style={styles.between}>
          <Text style={styles.nameText}>carbs</Text>
          <Text style={styles.infoText}>
            {Math.round(day.carbs * 100) / 100 || 0}g
          </Text>
        </View>
        <View style={styles.between}>
          <Text style={styles.nameText}>fat</Text>
          <Text style={styles.infoText}>
            {Math.round(day.fat * 100) / 100 || 0}g
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.between}>
          <Text style={styles.nameText}>sugar</Text>
          <Text style={styles.infoText}>
            {Math.round(day.sugar * 100) / 100 || 0}g
          </Text>
        </View>
        <View style={styles.between}>
          <Text style={styles.nameText}>saturated fat</Text>
          <Text style={styles.infoText}>
            {Math.round(day.saturated_fat * 100) / 100 || 0}g
          </Text>
        </View>
      </View>

      <View style={[styles.infoRow, styles.noBG]}>
        <View style={styles.between}>
          <Text style={styles.nameText}>fibre</Text>
          <Text style={styles.infoText}>
            {Math.round(day.fibre * 100) / 100 || 0}g
          </Text>
        </View>
        <View style={styles.between}>
          <Text style={styles.nameText}>salt</Text>
          <Text style={styles.infoText}>
            {Math.round(day.salt * 100) / 100 || 0}g
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.heading}>Food</Text>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("EatFood");
            }}
          >
            <Image
              source={require("./../assets/eat.png")}
              style={styles.icon}
            ></Image>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("AddFood");
            }}
          >
            <Image
              source={require("./../assets/add.png")}
              style={styles.icon}
            ></Image>
          </Pressable>
        </View>
      </View>

      <View style={styles.foodContainer}>
        {Object.entries(eaten).map((prop, key) => {
          console.log(prop);
          return (
            <Text style={styles.foodText} key={key}>
              - {prop[1].name} {prop[1].amount}
            </Text>
          );
        })}
        {!Object.entries(eaten).length > 0 ? (
          <Text style={styles.foodText}>- You haven't eaten anything yet</Text>
        ) : (
          <></>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  top: {
    marginTop: 30,
  },
  infoRow: {
    marginHorizontal: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors().dark_accent,
    borderRadius: 10,
  },
  noBG: {
    backgroundColor: "transparent",
  },
  between: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  nameText: {
    color: Colors().gray_accent,
    fontSize: 16,
  },
  infoText: {
    color: Colors().text,
    fontSize: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 20,
  },
  heading: {
    color: Colors().text,
    fontSize: 30,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  button: {
    width: 25,
    height: 45,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  icon: {
    width: 25,
    height: 25,
  },

  foodContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  foodText: {
    color: Colors().text,
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Nutrition;
