import { useCounter } from "../context/CounterContext";
import React from "react";

export const CounterDisplay = () => {
  const state = useCounter().count;
  return <div>{state}</div>;
};
