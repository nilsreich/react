import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useImmerReducer } from "use-immer";

//Create Context

export const CounterContext = createContext<State>({ count: 0 });
export const CounterDispatchContext = createContext<any>(null);

// Actions for dispatcher
export const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  STORED: "stored",
};

// Reducer
type Action = {
  type: "INCREMENT" | "DECREMENT" | "STORED";
  payload: any;
};
type State = {
  count: number;
};
const reducer = (draft: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      draft.count++;
      localStorage.setItem("value", draft.count.toString());
      break;
    case ACTIONS.DECREMENT:
      draft.count--;
      localStorage.setItem("value", draft.count.toString());

      break;
    case ACTIONS.STORED:
      draft.count = action.payload.initValue;
      break;
  }
};

// Provider
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

export const CounterProvider = ({ children }: Props) => {
  useEffect(() => {
    let init = "0";
    if (localStorage.getItem("value") != null) {
      init = localStorage.getItem("value");
    }
    dispatch({ type: ACTIONS.STORED, payload: { initValue: init } });
  }, []);

  //create ImmerReducer
  const [state, dispatch] = useImmerReducer(reducer, {
    count: 0,
  });
  return (
    <CounterContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
  );
};

export function useCounterDispatch() {
  return useContext(CounterDispatchContext);
}

export function useCounter() {
  return useContext(CounterContext);
}
