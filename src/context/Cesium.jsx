import { createContext, useContext, useEffect, useState } from "react";

const CesiumContext = createContext({});

export const CesiumProvider = ({ children }) => {
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    if (viewer) {
      console.log(viewer);
      // Ensure viewer is fully initialized
      if (viewer.scene && viewer.entities) {
        // Safe to access viewer properties
        console.log(viewer.entities);
      }
    }
  }, [viewer]);

  return (
    <CesiumContext.Provider value={{ viewer, setViewer }}>
      {children}
    </CesiumContext.Provider>
  );
};

export const useCesium = () => useContext(CesiumContext);
