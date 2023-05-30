import Container from "../components/Container";
import Input from "../components/Input";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Colors from "../components/Colors";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import api from "../fetch";
import { useGlobalState } from "../GlobalState";

const AddTodo = ({ navigation }) => {
  const [chosenDate, setChosenDate] = useState({});
  const [title, setTitle] = useState("");
  const [vpoints, setVpoints] = useState(0);
  const [description, setDescription] = useState("");
  const { setTodo } = useGlobalState();

  const save = () => {
    api(
      "todo",
      "post",
      (data) => {
        setTodo(data.todos);
        navigation.navigate("Home");
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
      <Input
        label="Choose a title"
        placeholder="Till 16:00 work is finished"
        value={title}
        setValue={setTitle}
      />
      <Input
        label="How many v-points"
        placeholder="12"
        value={vpoints}
        setValue={setVpoints}
      />
      <Textarea
        label="Add a description"
        placeholder="Don't forget that..."
        value={description}
        setValue={setDescription}
      />

      <Text style={styles.label}>Is there a deadline?</Text>
      <Calendar
        onDayPress={(day) => {
          console.log("selected day", Object.keys(chosenDate)[0]);
          if (day.dateString === Object.keys(chosenDate)[0]) {
            setChosenDate({});
          } else {
            setChosenDate({
              [day.dateString]: {
                selected: true,
                marked: true,
                dotColor: "transparent",
              },
            });
          }
        }}
        markedDates={chosenDate}
        style={styles.calendar}
        theme={{
          backgroundColor: Colors().dark_accent,
          calendarBackground: Colors().dark_accent,

          textSectionTitleColor: Colors().color_accent,
          textSectionTitleDisabledColor: Colors().dark_accent,

          selectedDayBackgroundColor: Colors().color_accent,
          selectedDayTextColor: Colors().text,

          monthTextColor: Colors().text,
          arrowColor: Colors().text,

          todayTextColor: Colors().color_accent,
          dayTextColor: Colors().text,
          textDisabledColor: Colors().gray_accent,
        }}
      />

      <Button text="Save Todo" press={save} />
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

export default AddTodo;
