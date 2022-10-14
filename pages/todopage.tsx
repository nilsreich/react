import type { NextPage } from "next";
import {useImmer} from 'use-immer'
import {useState} from 'react'

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
      done: true
    }
  ]);

  const toggleCompleted = (id) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo.done = !todo.done;
    });
  };

  const addTodo = async (e) => {
    e.preventDefault();
    await setTodos((draft) => {
      draft.push({
        id: Math.random(),
        title: value,
        done: false
      });
    });
    setValue("");
  };

  return (
    <div className="bg-neutral-900">
        <div className='text-9xl'>TodoListe</div>
      <form onSubmit={addTodo}>
        <label>
          Item:
          <input
            autoComplete="off"
            type="text"
            name="name"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <input type="submit" value="Add Todo" />
      </form>
      {todos.map((item) => {
        return (
          <div key={item.id} onClick={() => toggleCompleted(item.id)}>
            {item.title} <span>{item.done.toString()}</span>
          </div>
        );
      })}
    </div>
  );
 }
 
export default TodoPage;
