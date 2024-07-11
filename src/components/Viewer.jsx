import { memo, useEffect, useRef } from "react";
import { Ion } from "cesium";
import { Viewer as CesiumViewer } from "resium";

import { ION_TOKEN } from "@/config";
import { useCesium } from "@/context";

// Memoized the viewer to stop frequent re-rendering
export const Viewer = ({ children }) => {
  const viewerRef = useRef(null);
  const { viewer, setViewer } = useCesium();

  // Set default access token
  Ion.defaultAccessToken = ION_TOKEN;

  useEffect(() => {
    const cesiumElement = viewerRef.current?.cesiumElement;

    // When the viewer is mounted store the reference.
    if (cesiumElement) {
      setViewer(cesiumElement);

      return () => {
        viewer.entities.removeAll();
        viewer.destroy();
        setViewer(null);
      };
    }
  }, [viewerRef]);

  return (
    <CesiumViewer
      ref={viewerRef}
      className="w-full h-[calc(100vh_-_4rem)]"
      animation={false}
      infoBox={false}
      timeline={false}
      navigationHelpButton={false}
      onViewerReady={(viewer) => {
        viewer.camera.setView({
          destination: Cartesian3.fromDegrees(
            28.68580178978853,
            77.20773279009244,
            15000.0
          ),
          orientation: {
            heading: CesiumMath.toRadians(0.0),
            pitch: CesiumMath.toRadians(-15.0),
          },
        });
      }}
    >
      {children}
    </CesiumViewer>
  );
};
