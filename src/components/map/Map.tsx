import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { LineLayer, BitmapLayer } from "@deck.gl/layers/typed";
import { TileLayer } from "@deck.gl/geo-layers/typed";

const MapComponent = ({}): JSX.Element => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 16.8,
    latitude: 49.7,
    zoom: 7,
    pitch: 0,
    bearing: 0,
  };

  // Data to be used by the LineLayer
  const data = [
    {
      sourcePosition: [-122.41669, 37.7853],
      targetPosition: [-122.41669, 37.781],
    },
  ];

  const tileLayer = new TileLayer({
    // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
    data: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
    ],

    // Since these OSM tiles support HTTP/2, we can make many concurrent requests
    // and we aren't limited by the browser to a certain number per domain.
    maxRequests: 20,
    pickable: true,
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    // zoomOffset: devicePixelRatio === 1 ? -1 : 0,
    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      }: any = props.tile;

      return [
        new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        }),
      ];
    },
  });

  const lineLayer = new LineLayer({ id: "line-layer", data });

  const layers = [tileLayer, lineLayer];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    />
  );
};

export default MapComponent;
