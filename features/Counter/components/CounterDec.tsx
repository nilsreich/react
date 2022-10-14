import React from "react";
import { ACTIONS, useCounterDispatch } from "../context/CounterContext";
import { MinusIcon } from "@radix-ui/react-icons";

export const CounterDec = () => {
  const dispatch = useCounterDispatch();

  const decrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };
  return (
    <button onClick={decrement}>
      <MinusIcon />
    </button>
  );
};
