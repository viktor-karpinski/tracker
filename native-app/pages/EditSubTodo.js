import Container from "../components/Container";
import Input from "../components/Input";
import { useState } from "react";
import Button from "../components/Button";

import api from "../fetch";
import { useGlobalState } from "../GlobalState";

const EditTodo = ({ navigation }) => {
  const { todo, setTodo, selectedTodo, setSelectedTodo } = useGlobalState();
  const [title, setTitle] = useState(selectedTodo.title);

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
        description: null,
        date: null,
        vpoints: 0,
      })
    );
  };

  return (
    <Container>
      <Input
        label="Choose a title"
        placeholder="Till 16:00 work is finished"
        value={title}
        setValue={setTitle}
      />

      <Button text="Save Changes" press={save} />
    </Container>
  );
};

export default EditTodo;
