import { BoxIcon, Cross1Icon } from "@radix-ui/react-icons";
import type { NextPage } from "next";
import { Fragment } from "react";
import { useImmerReducer } from "use-immer";
import { useState, useEffect } from "react";

type todo = [
  {
    id: number;
    todo: string;
    done: boolean;
  }
];

const ACTIONS = {
  ADD: "add",
  REMOVE: "remove",
  TOGGLE: "toggle",
};
type ActionsType = { type: "ADD" | "REMOVE" | "TOGGLE"; payload: any };

const reducer = (draft: todo, action: ActionsType) => {
  switch (action.type) {
    case ACTIONS.ADD:
      draft.unshift({
        id: action.payload.key,
        todo: action.payload.todo,
        done: false,
      });
      break;
    case ACTIONS.REMOVE:
      let todo_no = draft.findIndex((todo) => todo.id === action.payload.id);
      draft.splice(todo_no, 1);
      break;
    case ACTIONS.TOGGLE:
      let todo = draft.find((todo) => todo.id === action.payload.id);
      todo.done = !todo.done;
      break;
  }
};

const todoreducer: NextPage = () => {
  const [list, dispatch] = useImmerReducer(reducer, [
    {
      id: 0,
      todo: "nothing",
      done: false,
    },
  ]);
  const [value, setValue] = useState("");
  const addTodo = (e: any) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD,
      payload: { key: Math.random(), todo: value },
    });
    setValue("");
  };
  const deleteTodo = (key) => {
    dispatch({ type: ACTIONS.REMOVE, payload: { id: key } });
  };

  const toggleTodo = (key) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: key } });
  };
  return (
    <div className="bg-neutral-900 text-neutral-300 h-screen p-8">
      <div className="text-4xl pb-8 text-pink-300">Todo</div>
      <div className="text-sm font-semibold text-neutral-600 mt-8 mb-3">
        AUFGABE HINZUFÜGEN
      </div>
      <form onSubmit={(e) => addTodo(e)}>
        <input
          value={value}
          className="bg-transparent p-2 border mr-2"
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="p-2 text-sm bg-blue-600">
          add
        </button>
      </form>
      <div className="text-sm font-semibold text-neutral-600 mt-12 mb-3">
        TODOS
      </div>
      <ul className="">
        {list?.map((item) => {
          return (
            <li
              key={item.id}
              className={`${
                item.done === true ? "line-through text-neutral-600" : ""
              } flex gap-8 text-lg border-b border-neutral-700  py-2 w-full px-2 items-center`}
            >
              <div onClick={() => deleteTodo(item.id)}>
                <Cross1Icon />
              </div>
              <div className="grow">{item.todo}</div>
              <div onClick={() => toggleTodo(item.id)}>
                <BoxIcon />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default todoreducer;
