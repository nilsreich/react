import {
  CheckIcon,
  Cross1Icon,
  PlusIcon,
  SquareIcon,
} from "@radix-ui/react-icons";
import type { NextPage } from "next";
import { useImmerReducer } from "use-immer";
import { useEffect, useState } from "react";

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
  INIT: "init",
};
type ActionsType = { type: "ADD" | "REMOVE" | "TOGGLE" | "INIT"; payload: any };

const reducer = (draft: todo, action: ActionsType) => {
  switch (action.type) {
    case ACTIONS.ADD:
      draft.unshift({
        id: action.payload.key,
        todo: action.payload.todo,
        done: false,
      });
      localStorage.setItem("nix", JSON.stringify(draft));
      break;
    case ACTIONS.REMOVE:
      let todo_no = draft.findIndex((todo) => todo.id === action.payload.id);
      draft.splice(todo_no, 1);
      localStorage.setItem("nix", JSON.stringify(draft));

      break;
    case ACTIONS.TOGGLE:
      let todo = draft.find((todo) => todo.id === action.payload.id);
      todo.done = !todo.done;
      localStorage.setItem("nix", JSON.stringify(draft));

      break;
    case ACTIONS.INIT:
      draft.length = 0;
      action.payload.store.map((item) => draft.push(item));
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

  useEffect(() => {
    let store = JSON.parse(localStorage.getItem("nix"));
    store ? dispatch({ type: ACTIONS.INIT, payload: { store } }) : null;
  }, []);
  const addTodo = (e: any) => {
    e.preventDefault();
    if (value != "") {
      dispatch({
        type: ACTIONS.ADD,
        payload: { key: Math.random(), todo: value },
      });
      setValue("");
    }
  };
  const deleteTodo = (key) => {
    dispatch({ type: ACTIONS.REMOVE, payload: { id: key } });
  };

  const toggleTodo = (key) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: key } });
  };
  return (
    <div className="bg-neutral-900 text-neutral-300 h-screen p-8 select-none w-full">
      <div className="max-w-2xl mx-auto">
        <div className=" pb-8 font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          DEVELOPMENT
        </div>
        <div className="text-sm font-semibold flex items-center text-neutral-600 mt-8 mb-3">
          AUFGABE HINZUFÜGEN
        </div>
        <form onSubmit={(e) => addTodo(e)} className="w-full flex">
          <input
            value={value}
            className="grow bg-transparent p-3 border-b outline-none border-blue-600 focus:bg-neutral-800"
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className=" p-4 bg-blue-800">
            <PlusIcon />
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
                  {item.done ? <CheckIcon /> : <SquareIcon />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default todoreducer;
