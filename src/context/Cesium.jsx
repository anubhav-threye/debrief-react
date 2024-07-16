import { Cartesian3 } from "cesium";
import { createContext, useContext, useEffect, useState } from "react";

import { boxModel, entityLabel } from "@/utils";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ALTITUDE,
} from "@/constants";

const CesiumContext = createContext({});

export const CesiumProvider = ({ children }) => {
  const [viewer, setViewer] = useState(null);
  const [entities, setEntities] = useState({});

  useEffect(() => {
    if (viewer) {
      console.log(viewer);
    }
  }, [viewer]);

  const formatEntity = ({ entity, previousEntity = null }) => {
    // Convert the coordinate data into cartesian3 format
    const entityPosition = Cartesian3.fromDegrees(
      entity.long
        ? parseFloat(entity.long) + DEFAULT_LONGITUDE
        : DEFAULT_LONGITUDE,
      entity.lat ? parseFloat(entity.lat) + DEFAULT_LATITUDE : DEFAULT_LATITUDE,
      entity.alt ? parseFloat(entity.alt) : DEFAULT_ALTITUDE
    );

    // Return entity related data
    return {
      id: entity.id,
      name: entity.name,
      position: entityPosition,
      previousPosition: previousEntity ?? previousEntity?.position,
      previousTimestamp: Date.now(),
      speed: 0,
      box: boxModel(entity.color.toLowerCase()),
      label: entityLabel(entity.name),
    };
  };

  return (
    <CesiumContext.Provider
      value={{ viewer, setViewer, entities, setEntities, formatEntity }}
    >
      {children}
    </CesiumContext.Provider>
  );
};

export const useCesium = () => useContext(CesiumContext);
