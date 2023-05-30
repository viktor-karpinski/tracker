import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import Colors from "./components/Colors";
import Nutrition from "./pages/Nutrition";
import EatFood from "./pages/EatFood";
import AddFood from "./pages/AddFood";
import { GlobalStateProvider, useGlobalState } from "./GlobalState";
import TodoDetails from "./pages/TodoDetails";
import EditTodo from "./pages/EditTodo";
import EditSubTodo from "./pages/EditSubTodo";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import api from "./fetch";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalStateProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "VikDo",
              headerStyle: {
                backgroundColor: Colors().background,
                shadowColor: "transparent",
                shadow: 0,
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                color: Colors().text,
              },
            }}
          />
          <Stack.Screen
            name="AddTodo"
            component={AddTodo}
            options={{
              title: "Add Todo",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="TodoDetails"
            component={TodoDetails}
            options={{
              title: "Todo Details",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => <TodoButtons />,
            }}
          />
          <Stack.Screen
            name="EditTodo"
            component={EditTodo}
            options={{
              title: "Edit Todo",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="EditSubTodo"
            component={EditSubTodo}
            options={{
              title: "Edit Sub-Todo",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Nutrition"
            component={Nutrition}
            options={{
              title: "Nutrition",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="EatFood"
            component={EatFood}
            options={{
              title: "Eat Food",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="AddFood"
            component={AddFood}
            options={{
              title: "Add Food",
              headerStyle: {
                backgroundColor: "#11100f",
                shadowColor: "#666158",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStateProvider>
  );
}

function TodoButtons() {
  const navigation = useNavigation();
  const { setTodo, selectedTodo } = useGlobalState();
  return (
    <View style={styles.box}>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("EditTodo");
        }}
      >
        <Image
          source={require("./assets/edit.png")}
          style={styles.icon}
        ></Image>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          api("todo/" + selectedTodo.id, "delete", (data) => {
            setTodo(data.todos);
            navigation.goBack();
          });
        }}
      >
        <Image
          source={require("./assets/trash.png")}
          style={styles.icon}
        ></Image>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  box: {
    display: "flex",
    flexDirection: "row",
  },
});
