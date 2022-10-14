import React, { useState } from "react";
import { useTodoDispatch, ACTIONS } from "../context/TodoContext";

export const TodoAdd = () => {
  const dispatch = useTodoDispatch();
  const [title, setTitle] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD,
      payload: { id: Math.random(), title: title, done: false },
    });
    setTitle("");
  };

  return (
    <form onSubmit={addTodo} className="flex items-center gap-4">
      <label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          className="bg-transparent p-2 placeholder-neutral-600 outline-none text-italic border-b focus:border-blue-600"
          placeholder="mach das"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Add Todo"
        className="bg-neutral-800 px-2 py-1 border border-black hover:bg-neutral-700 active:bg-black"
      />
    </form>
  );
};
