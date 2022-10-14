import type { NextPage } from "next";
import { useImmer } from "use-immer";
import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

type todosProps = {
  id: number;
  title: string;
  done: boolean;
};

const TodoPage: NextPage = () => {
  const [value, setValue] = useState<string>(null);
  const [todos, setTodos] = useImmer<todosProps[]>([
    {
      id: 0,
      title: "Learn React",
      done: true,
    },
  ]);

  const deleteItem = (id) => {
    setTodos((draft) => {
      const todoNr = draft.findIndex((todo) => todo.id === id);
      draft.splice(todoNr, 1);
    });
  };

  const toggleCompleted = (id) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo.done = !todo.done;
    });
  };

  const addTodo = (e) => {
    e.preventDefault();
    setTodos((draft) => {
      draft.push({
        id: Math.random(),
        title: value,
        done: false,
      });
    });
    setValue("");
  };

  return (
    <div className="bg-neutral-900 h-screen text-neutral-300 p-4">
      <div className="text-9xl">TodoListe</div>
      <form onSubmit={addTodo} className="flex items-center gap-4">
        <label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            className="bg-transparent p-2 placeholder-neutral-600 outline-none text-italic border-b focus:border-blue-600"
            placeholder="mach das"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Add Todo"
          className="bg-neutral-800 px-2 py-1 border border-black hover:bg-neutral-700 active:bg-black"
        />
      </form>
      {todos.map((item) => {
        return (
          <div
            key={item.id}
            className={`${
              item.done ? "text-neutral-600" : ""
            } flex items-center gap-4`}
          >
            <div onClick={() => deleteItem(item.id)}>
              <Cross1Icon />
            </div>
            <div
              className={item.done ? "line-through" : ""}
              onClick={() => toggleCompleted(item.id)}
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoPage;
