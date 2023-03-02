import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { LineLayer, BitmapLayer, GeoJsonLayer } from "@deck.gl/layers/typed";
import locations from "../../data/monasteries-sample.json";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import { ButtonGroup, Button } from "react-bootstrap";
import { useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineCompass,
  AiOutlineCompress,
  AiOutlineExpand,
  AiOutlineExpandAlt,
  AiOutlineArrowUp,
  AiOutlineDash,
  AiOutlineLine,
} from "react-icons/ai";

const MapComponent = ({}): JSX.Element => {
  const [viewState, setViewState] = useState({
    longitude: 16.8,
    latitude: 49.7,
    zoom: 7,
    pitch: 0,
    bearing: 0,
    maxZoom: 13, //not working too well
  });

  function MapControls() {
    return (
      <div
        style={{
          position: "fixed",
          top: "20px",
          width: "30px",
          left: "11px",
          zIndex: 1000,
          backgroundColor: "white",
        }}
      >
        <ButtonGroup
          vertical
          size="sm"
          style={{
            width: "30px",
          }}
        >
          <Button
            title="Zoom in"
            variant="outline-dark"
            onClick={() => {
              //map.setView(center, zoom);
            }}
          >
            <AiOutlinePlus />
          </Button>
          <Button
            title="Zoom out"
            variant="outline-dark"
            onClick={() => {
              //map.setView(center, zoom);
            }}
          >
            <AiOutlineMinus />
          </Button>
        </ButtonGroup>
        <ButtonGroup
          className="mt-2"
          vertical
          size="sm"
          style={{
            width: "30px",
          }}
        >
          <Button
            size="sm"
            variant="outline-dark"
            title="Reset map orientation"
            onClick={() => {
              //map.setView(center, zoom);
            }}
          >
            <AiOutlineArrowUp />
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            title="Reset map pitch"
            onClick={() => {
              //map.setView(center, zoom);
            }}
          >

<AiOutlineLine />
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            title="Full data extent"
            onClick={() => {
              //map.setView(center, zoom);
            }}
          >
            <AiOutlineExpand />
          </Button>
        </ButtonGroup>
      </div>
    );
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
    <>
      <MapControls />
      <DeckGL
        viewState={viewState}
        onViewStateChange={(e: any) => setViewState(e.viewState)}
        controller={true}
        layers={layers}
      />
    </>
  );
};

export default MapComponent;
