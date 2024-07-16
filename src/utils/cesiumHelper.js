import { Cartesian2, Cartesian3, Color } from "cesium";

export const boxModel = (color) => ({
  dimensions: new Cartesian3(3000, 3000, 3000),
  material: color === "blue" ? Color.BLUE : Color.RED,
});

export const entityLabel = (name) => ({
  text: name,
  font: "14px Consolas",
  fillColor: Color.WHITE,
  outlineColor: Color.BLACK,
  outlineWidth: 2,
  pixelOffset: new Cartesian2(0, -30),
});
