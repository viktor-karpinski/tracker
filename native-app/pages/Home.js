import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import Container from "../components/Container";
import Week from "../components/Week";
import NutritionQuickInfo from "../components/NutrionQuickInfo";
import TodoContainer from "../components/TodoContainer";
import api from "../fetch";
import { useGlobalState } from "../GlobalState";

const Home = ({ navigation, route }) => {
  const { setDay, setEaten, setFood, todo, setTodo, date, resetTodo } =
    useGlobalState();

  useEffect(() => {
    api("day/" + date, "get", (data) => {
      setDay(data.day);
    });
    api("food/eaten/" + date, "get", (data) => {
      setEaten(data.food);
    });
  }, [date]);

  useEffect(() => {
    api("food", "get", (data) => {
      setFood(data.food);
    });
  }, []);

  return (
    <Container>
      <Week></Week>
      <NutritionQuickInfo
        navigation={navigation}
        route={route}
      ></NutritionQuickInfo>
      <TodoContainer navigation={navigation} route={route}></TodoContainer>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Home;
