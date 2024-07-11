import { memo, useEffect, useRef } from "react";
import { Ion } from "cesium";
import { Viewer as CesiumViewer } from "resium";

import { ION_TOKEN } from "@/config";
import { useCesium } from "@/context";

// Memoized the viewer to stop frequent re-rendering
export const Viewer = memo(({ children }) => {
  const viewerRef = useRef(null);
  const { setViewer } = useCesium();

  // Set default access token
  Ion.defaultAccessToken = ION_TOKEN;

  useEffect(() => {
    // When the viewer is mounted store the reference.
    if (viewerRef.current?.cesiumElement) {
      setViewer(viewerRef.current.cesiumElement);
    }
  }, [viewerRef.current]);

  return (
    <CesiumViewer
      ref={viewerRef}
      className="w-full h-[calc(100vh_-_4rem)]"
      animation={false}
      infoBox={false}
      timeline={false}
      navigationHelpButton={false}
    >
      {children}
    </CesiumViewer>
  );
});
