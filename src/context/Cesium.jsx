import { Cartesian3 } from "cesium";
import { createContext, useContext, useEffect, useState } from "react";

import { boxModel, entityLabel, formatData } from "@/utils";
import {
  DEFAULT_LATITUDE,
  DEFAULT_LONGITUDE,
  DEFAULT_ALTITUDE,
} from "@/constants";

const CesiumContext = createContext({});

export const CesiumProvider = ({ children }) => {
  const [viewers, setViewers] = useState({});
  const [entities, setEntities] = useState({});

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (viewers) {
      console.log(viewers);
    }
  }, [viewers]);

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

  const updateEntity = ({ rawEntity }) => {
    if (!rawEntity) return;

    // Transform the raw string data into usable object
    const parsedEntity = formatData(rawEntity);
    const previousEntity = entities?.[parsedEntity.id];

    const entity = formatEntity({ entity: parsedEntity, previousEntity });

    setEntities((prev) => ({
      ...prev,
      [entity.id]: entity,
    }));
  };

  return (
    <CesiumContext.Provider
      value={{
        viewers,
        setViewers,
        entities,
        setEntities,
        formatEntity,
        updateEntity,
        isPlaying,
        setIsPlaying,
        currentPosition,
        setCurrentPosition,
        isLive,
        setIsLive,
      }}
    >
      {children}
    </CesiumContext.Provider>
  );
};

export const useCesium = () => useContext(CesiumContext);
