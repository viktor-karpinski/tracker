import Container from "../components/Container";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import Colors from "../components/Colors";

import { Calendar } from "react-native-calendars";
import api from "../fetch";
import { useGlobalState } from "../GlobalState";

const EditTodo = ({ navigation }) => {
  const { todo, setTodo, selectedTodo, setSelectedTodo } = useGlobalState();
  const [chosenDate, setChosenDate] = useState({});
  const [title, setTitle] = useState(selectedTodo.title);
  const [vpoints, setVpoints] = useState(selectedTodo.vpoints + "");
  const [description, setDescription] = useState(selectedTodo.description);

  useEffect(() => {
    if (selectedTodo.deadline !== null) {
      setChosenDate({
        [selectedTodo.deadline.split(" ")[0]]: { selected: true },
      });
    }
  }, []);

  const save = () => {
    api(
      "todo/" + selectedTodo.id,
      "put",
      (data) => {
        setSelectedTodo(data.todo);
        setTodo(data.todos);
        navigation.navigate("TodoDetails");
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

      <Button text="Save Changes" press={save} />
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

export default EditTodo;
