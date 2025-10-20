// src/context/LoteContext.jsx
import { createContext, useContext, useState } from "react";

const LoteContext = createContext(null);
export const useLote = () => useContext(LoteContext);

export function LoteProvider({ children }) {
  const [loteActual, setLoteActual] = useState(null);

  return (
    <LoteContext.Provider value={{ loteActual, setLoteActual }}>
      {children}
    </LoteContext.Provider>
  );
}
