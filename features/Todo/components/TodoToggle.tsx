import React from "react";
import { useTodoDispatch, ACTIONS } from "../context/TodoContext";

export const TodoToggle = ({ id }) => {
  const dispatch = useTodoDispatch();
  const toggleCompleted = (id: number) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: id } });
  };
  return (
    <>
      <span onClick={() => toggleCompleted(id)}>{id}</span>
    </>
  );
};
