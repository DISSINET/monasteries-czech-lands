import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { LineLayer, BitmapLayer, GeoJsonLayer } from "@deck.gl/layers/typed";
import locations from "../../data/monasteries-sample.json";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { updateMapState } from "./MapSlice";
import MapControls from "./MapControls";
import MapScale from "./MapScale";

const MapComponent = ({}): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  function dispatchMapState(val: any) {
    dispatch(updateMapState(val));
  }

  const tileLayer = new TileLayer({
    data: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
    ],
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
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <MapControls />
      <MapScale definitionLayer={tileLayer}/>
      <DeckGL
        viewState={mapState}
        onViewStateChange={(e: any) => dispatchMapState(e.viewState)}
        controller={true}
        layers={layers}
      />
    </div>
  );
};

export default MapComponent;
