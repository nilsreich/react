import React, { Fragment } from "react";
import { useTodo } from "../context/TodoContext";
import { TodoToggle } from "./TodoToggle";

export const TodoList = () => {
  const state = useTodo();

  return (
    <Fragment>
      {state?.map((item) => {
        return (
          <div
            key={item.id}
            className={item.done ? "bg-green-100" : "bg-red-100"}
          >
            {item.title} <TodoToggle id={item.id} />
          </div>
        );
      })}
    </Fragment>
  );
};
