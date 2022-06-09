import React, { createContext, useContext, useState } from "react";

export const globalContext = createContext();
export const useMyState = () => {
  const { myState, setMyState } = useContext(globalContext);
  return { myState, setMyState };
};
export function ContextProvider({ children }) {
  const [myState, setMyState] = useState({});
  return (
    <globalContext.Provider value={{ myState, setMyState }}>
      {children}
    </globalContext.Provider>
  );
}
