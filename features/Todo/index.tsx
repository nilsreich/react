import React from "react";
import { TodoProvider, useTodo } from "./context/TodoContext";
import { TodoAdd } from "./components/TodoAdd";
import { TodoList } from "./components/TodoList";

export const Todo = () => {
  return (
    <TodoProvider>
      <TodoAdd />
      <TodoList />
    </TodoProvider>
  );
};
