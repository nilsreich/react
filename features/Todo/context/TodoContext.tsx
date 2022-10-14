import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useImmerReducer } from "use-immer";

//Create Context

export const TodoContext = createContext<State | null>(null);
export const TodoDispatchContext = createContext<any>(null);

// Actions for dispatcher
export const ACTIONS = {
  ADD: "add",
  TOGGLE: "toggle",
  LOAD: "load",
  RENAME: "rename",
  REMOVE: "remove",
};

// Reducer
type Action = {
  type: "ADD" | "TOGGLE" | "LOAD" | "RENAME" | "REMOVE";
  payload: any;
};

type State = [{ id: number; title: string; done: boolean }];

const reducer = (draft: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      draft.push({
        id: action.payload.id,
        title: action.payload.title,
        done: false,
      });

      let text: State[] = [];
      draft.forEach((item) => {
        text.push(item);
      });
      localStorage.setItem("todos", JSON.stringify(text));
      break;
    case ACTIONS.TOGGLE:
      const todo = draft.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.done = !todo.done;
      }
      break;
    case ACTIONS.LOAD:
      draft = action.payload.initValue;
    default:
      return draft;
  }
};

// Provider
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const TodoProvider = ({ children }: Props) => {
  useEffect(() => {
    let temp = JSON.parse(localStorage.getItem("todos"));
    if (temp != null) {
      dispatch({ type: ACTIONS.LOAD, payload: { initValue: temp } });
    }
    console.log("updated");
  }, []);
  const initialState = () => {
    return [{ id: 0, title: "dew", done: true }];
  };
  const [state, dispatch] = useImmerReducer(reducer, initialState());

  //create ImmerReducer
  return (
    <div>
      <TodoContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
          {children}
        </TodoDispatchContext.Provider>
      </TodoContext.Provider>
    </div>
  );
};

export function useTodoDispatch() {
  return useContext(TodoDispatchContext);
}

export function useTodo() {
  return useContext(TodoContext);
}
