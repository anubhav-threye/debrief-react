import { useEffect, useRef } from "react";
import { Ion } from "cesium";
import { Viewer } from "resium";

import { ION_TOKEN } from "@/config";
import { useCesium } from "@/context";
import { HOME_COORDINATE } from "@/constants";

// Memoized the viewer to stop frequent re-rendering
export const ViewerSection = ({ id, children }) => {
  const viewerRef = useRef(null);
  const { setViewers } = useCesium();

  // Set default access token
  Ion.defaultAccessToken = ION_TOKEN;

  useEffect(() => {
    const cesiumElement = viewerRef.current?.cesiumElement;

    // When the viewer is mounted store the reference.
    if (cesiumElement) {
      setViewers((prev) => ({ ...prev, [id]: cesiumElement }));

      // Set the home view to a certain position (Gwalior Coords)
      cesiumElement.camera.flyHome(0);
      cesiumElement.camera.setView({ destination: HOME_COORDINATE });

      return () => {
        setViewers((prev) => ({ ...prev, [id]: null }));
      };
    }
  }, [viewerRef]);

  return (
    <Viewer
      ref={viewerRef}
      className="w-full h-[calc(100vh_-_4rem)]"
      animation={false}
      infoBox={false}
      timeline={false}
      navigationHelpButton={false}
    >
      {children}
    </Viewer>
  );
};
