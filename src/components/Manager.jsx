import { useEffect } from "react";
import { Entity } from "resium";

import { useCesium, useSocket } from "@/context";
import { formatData } from "@/utils";

export const Manager = () => {
  const { allData, updateFlag } = useSocket();
  const { entities, setEntities, formatEntity } = useCesium();

  useEffect(() => {
    const dataList = allData.current;

    if (dataList.length) {
      dataList.map((rawEntities) => {
        rawEntities.map((rawEntity) => {
          // Transform the raw string data into usable object
          const parsedEntity = formatData(rawEntity);
          const previousEntity = entities?.[parsedEntity.id];

          const entity = formatEntity({ entity: parsedEntity, previousEntity });

          setEntities((prev) => ({
            ...prev,
            [entity.id]: entity,
          }));
        });
      });
    }
  }, [updateFlag]);

  useEffect(() => {}, []);

  return (
    <>
      {Object.values(entities).map((entity) => (
        <Entity key={entity.id} {...entity} />
      ))}
    </>
  );
};
