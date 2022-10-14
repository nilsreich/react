import React, { Fragment } from "react";
import { CounterInc } from "./components/CounterInc";
import { CounterDisplay } from "./components/CounterDisplay";
import { CounterProvider } from "./context/CounterContext";
import { CounterDec } from "./components/CounterDec";

export const Counter = () => {
  return (
    <Fragment>
      <CounterProvider>
        <CounterInc />
        <CounterDisplay />
        <CounterDec />
      </CounterProvider>
    </Fragment>
  );
};
