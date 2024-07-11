import { Cartesian3, Color, HeightReference } from "cesium";
import { Entity as CesiumEntity } from "resium";

export const Entity = () => {
  const cartesianPosition = Cartesian3.fromDegrees(
    28.68580178978853,
    77.20773279009244
  );
  return (
    <CesiumEntity
      point={{
        pixelSize: 10,
        color: Color.RED,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
      }}
      position={cartesianPosition}
    ></CesiumEntity>
  );
};
