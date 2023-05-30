import React, { useState, createContext, useContext } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [date, setDate] = useState(new Date().toJSON().slice(0, 10));
  const [day, setDay] = useState({});
  const [food, setFood] = useState({});
  const [eaten, setEaten] = useState({});
  const [todo, setTodo] = useState({});
  const [resetTodo, setResetTodo] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState({});

  return (
    <GlobalStateContext.Provider
      value={{
        day,
        setDay,
        food,
        setFood,
        todo,
        setTodo,
        eaten,
        setEaten,
        date,
        setDate,
        selectedTodo,
        setSelectedTodo,
        resetTodo,
        setResetTodo,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
