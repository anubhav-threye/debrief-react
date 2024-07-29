import { useEffect, useState } from "react";
import { Entity } from "resium";

import { ViewerSection, PlayerSection } from "@/components";
import { useCesium, useSocket } from "@/context";

export const Manager = () => {
  const { allData, updateFlag } = useSocket();
  const {
    entities,
    updateEntity,
    currentPosition,
    setCurrentPosition,
    isPlaying,
    isLive,
    setIsLive,
  } = useCesium();

  // Player max range
  const [maxRange, setMaxRange] = useState(0);

  /**
   * When we're synchronized and display live data
   */
  useEffect(() => {
    const dataList = allData.current;

    if (dataList.length) {
      // Set Player max range
      setMaxRange(dataList.length);

      if (isLive) {
        // If the flow is set to live then the player should be synchronized with the socket emitted data
        setCurrentPosition(dataList.length);

        dataList.map((rawEntities) => {
          rawEntities.map((rawEntity) => {
            updateEntity({ rawEntity });
          });
        });
      }
    }
  }, [isLive, updateFlag]);

  /**
   * When we're updating based on prev position and moving forward toward live data
   */
  useEffect(() => {
    // If paused, the synchronization should be stopped meaning that its not live anymore
    if (!isPlaying) setIsLive(false);

    // If playing but not actually live
    if (isPlaying && !isLive) {
      const dataList = allData.current;

      if (dataList && currentPosition !== dataList?.length) {
        const rawEntities = dataList[currentPosition];

        if (!rawEntities) return;

        rawEntities.map((rawEntity) => {
          // Transform the raw string data into usable object
          updateEntity({ rawEntity });
        });

        setTimeout(() => {
          // Increment the count of currentPosition
          setCurrentPosition((prev) => parseInt(prev) + 1);
        }, 300);
      }
    }
  }, [isPlaying, isLive, currentPosition]);

  const handleRange = (e) => {
    const position = e.target.value;

    setCurrentPosition(position);

    if (position !== maxRange) {
      setIsLive(false);
    }
  };

  const handleLive = () => {
    const dataLength = allData.current?.length;

    setMaxRange(dataLength);
    setCurrentPosition(dataLength);
    setIsLive(true);
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <section className="col-span-1">
          <ViewerSection id="1">
            {Object.values(entities).map((entity) => (
              <Entity key={entity.id} {...entity} />
            ))}
          </ViewerSection>
        </section>
        <section className="col-span-1">
          <ViewerSection id="2">
            {Object.values(entities).map((entity) => (
              <Entity key={entity.id} {...entity} />
            ))}
          </ViewerSection>
        </section>
      </div>

      <section className="w-full h-16">
        <PlayerSection
          maxRange={maxRange}
          value={currentPosition}
          handleRange={handleRange}
          handleLive={handleLive}
        />
      </section>
    </>
  );
};
