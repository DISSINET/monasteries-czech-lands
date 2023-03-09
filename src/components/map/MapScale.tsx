import React from "react";
import { useAppSelector } from "./../../app/hooks";

// TODO parametrized positoning, max width and other values
type MapScaleProps = {
  definitionLayer: any;
};

const MapScale = ({ definitionLayer }: MapScaleProps): JSX.Element => {
  const zoom = useAppSelector((state) => state.map.zoom);
  const latitude = useAppSelector((state) => state.map.latitude);
  const maxWidth = 100;

  // from https://deck.gl/docs/developer-guide/coordinate-systems#transforming-dimensions
  // - MapView and FirstPersonView: 512 common units equals C / cos(phi) where C is the
  //   circumference of earth, and phi is the latitude in radians.
  // - 1 common unit equals 2 ** z pixel where z is the zoom of the current viewport.
  //
  //{((40075 / (latitude * (Math.PI / 180)) / 512) * 2 * (1 / zoom)) / 10} km

  function getScale() {
    return "100px";
  }

  return (
    <div
      style={{
        position: "absolute",
        width: getScale(),
        zIndex: 10000,
        borderBottom: "2px solid black",
        bottom: "11px",
        left: "11px",
      }}
    >
      km
    </div>
  );
};

export default MapScale;
