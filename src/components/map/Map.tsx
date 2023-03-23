import React from "react";
import DeckGL from "@deck.gl/react/typed";
import {
  BitmapLayer,
  ScatterplotLayer,
  GeoJsonLayer,
} from "@deck.gl/layers/typed";
import locations from "../../data/monasteries.json";
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

  const countryLevel = new TileLayer({
    data: [
      "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
    ],
    maxRequests: 20,
    pickable: true,
    minZoom: 0,
    maxZoom: 9,
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

  const cityLevel = new TileLayer({
    data: [
      "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      "https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      "https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
      "https://d.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
    ],
    maxRequests: 20,
    pickable: true,
    minZoom: 0,
    maxZoom: 15,
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

  const monasteries = new ScatterplotLayer({
    id: "monasteries",
    data: locations,
    pickable: true,
    stroked: true,
    filled: true,
    getElevation: 30,
    getPosition: (d: any) => d.geo,
    opacity: 0.6,
    radiusMinPixels: mapState.zoom * 0.5,
    lineWidthMinPixels: 1,
    getFillColor: (d) => [0, 0, 220],
    getLineColor: (d) => [255, 255, 255],
  });

  const layers = [cityLevel, monasteries];

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <MapControls />
      <DeckGL
        viewState={mapState}
        onViewStateChange={(e: any) => dispatchMapState(e.viewState)}
        controller={true}
        layers={layers}
        getTooltip={({ object }) =>
          object &&
          `${object.id}\n${object.communities_count}`
        }
      />
    </div>
  );
};

export default MapComponent;
