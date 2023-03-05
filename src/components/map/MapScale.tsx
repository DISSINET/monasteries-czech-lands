import React from "react";
import { useAppSelector } from "./../../app/hooks";

// TODO parametrized positoning

const MapScale = ({}): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);

  return (
    <div
      style={{
        position: "absolute",
        width: "150px",
        zIndex: 10000,
        borderBottom: "2px solid black",
        bottom: "11px",
        left: "11px",
      }}
    >
      100 km
    </div>
  );
};

export default MapScale;
