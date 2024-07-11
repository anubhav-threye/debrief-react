import { createContext, useContext, useState } from "react";

const CesiumContext = createContext({});

export const CesiumProvider = ({ children }) => {
  const [viewer, setViewer] = useState(null);

  return (
    <CesiumContext.Provider value={{ viewer, setViewer }}>
      {children}
    </CesiumContext.Provider>
  );
};

export const useCesium = () => useContext(CesiumContext);
