import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { LineLayer, BitmapLayer, GeoJsonLayer } from "@deck.gl/layers/typed";
import locations from "../../data/monasteries-sample.json";
import { TileLayer } from "@deck.gl/geo-layers/typed";

const MapComponent = ({}): JSX.Element => {
  // Viewport settings
  const INITIAL_VIEW_STATE = {
    longitude: 16.8,
    latitude: 49.7,
    zoom: 7,
    pitch: 0,
    bearing: 0,
    maxZoom: 13,
  };

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
    maxZoom: 13,
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

  const monasteries = new GeoJsonLayer({
    id: "monasteries",
    data: [locations],
    pickable: true,
    stroked: true,
    filled: true,
    extruded: true,
    pointType: "circle",
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getPointRadius: 1000,
    getLineWidth: 1,
    getElevation: 30,
  });

  const layers = [tileLayer, monasteries];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    />
  );
};

export default MapComponent;
