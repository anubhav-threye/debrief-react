import { Ion } from "cesium";
import { Viewer as CesiumViewer } from "resium";

import { ION_TOKEN } from "@/config";

export const Viewer = () => {
  Ion.defaultAccessToken = ION_TOKEN;

  return <CesiumViewer full></CesiumViewer>;
};
