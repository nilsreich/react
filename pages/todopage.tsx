import type { NextPage } from "next";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

type todosProps = {
  id: number;
  title: string;
  done: boolean;
};

const TodoPage: NextPage = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useImmer<todosProps[]>([
    {
      id: 0,
      title: "Learn React",
      done: true,
    },
  ]);

  const deleteItem = (id: number) => {
    setTodos((draft) => {
      const todoNr = draft.findIndex((todo) => todo.id === id);
      draft.splice(todoNr, 1);
    });
  };

  const toggleCompleted = (id: number) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo ? (todo.done = !todo.done) : null;
    });
  };

  const addTodo = (e: any) => {
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

  // LOCALSTORAGE getItems
  // Prob:
  // localstorage isn't async and not accessible in SSR, so we can't init the reducer with the
  // local stored items.
  // Solution:
  // so we have to wait until window.object ist accessible after the useEffect
  // then we have to overwrite the immer draft by setting the length of the draft.Array to zero
  // after this, push every element from the Object from the localstrogage into the draft
  // Additional notes:
  // react 18 runs the useEffect hook twice, so we have to set an initVariable and increase them
  // after the first render
  let init = 0;
  useEffect(() => {
    if (init === 0) {
      init += 1;
      let store = JSON.parse(localStorage.getItem("Atodo"));
      if (store) {
        setTodos((draft) => {
          draft.length = 0;
          store.map((item: todosProps) => draft.push(item));
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Atodo", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="bg-neutral-900 h-screen text-neutral-300 p-4">
      <div className="text-9xl">TodoListe</div>
      <form onSubmit={addTodo} className="flex items-center gap-4">
        <label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            value={value}
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
