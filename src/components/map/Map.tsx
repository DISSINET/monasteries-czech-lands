import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { DataFilterExtension } from "@deck.gl/extensions/typed";
import {
  BitmapLayer,
  ScatterplotLayer,
  GeoJsonLayer,
} from "@deck.gl/layers/typed";
import locations from "../../data/monasteries.json";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { updateMapState } from "./MapSlice";
import { selectMonastery } from "./../MainSlice";
import MapControls from "./MapControls";
import MapScale from "./MapScale";

const MapComponent = ({}): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();
  const selectedOrderIDs = useAppSelector(
    (state) => state.main.selectedOrderIDs
  );
  const selectedStatusIDs = useAppSelector(
    (state) => state.main.selectedStatusIDs
  );

  function dispatchMapState(val: any) {
    dispatch(updateMapState(val));
  }

  function dispatchSelectedMonastery(mon: any) {
    console.log(mon);
    dispatch(selectMonastery(mon));
  }

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

  function setVisibility(item: any) {
    //selectedOrderIDs
    //selectedStatusIDs
    //let itemStatuses
    if (selectedOrderIDs.length === 0 && selectedStatusIDs.length === 0) {
      return 1;
    } else {
      // TODO
      let itemStatusMatch = 0;
      let itemComMatch = 0;
      item.communities.map((com: any) => {
        if (selectedOrderIDs.includes(com.order)) {
          itemComMatch = 1;
        }
      });
    }
  }

  function setColor(count: number): any {
    let colorScale = [
      [51, 51, 255],
      [51, 51, 255],
      [0, 0, 180],
      [0, 0, 180],
      [0, 0, 180],
      [0, 0, 10],
      [0, 0, 10],
      [0, 0, 10],
      [0, 0, 10],
      [0, 0, 10],
      [0, 0, 10],
      [0, 0, 10],
    ];
    return colorScale[count];
  }

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
    getFillColor: (d) => setColor(d.communities_count as number),
    getLineColor: (d) => [255, 255, 255],
    // props added by DataFilterExtension
    getFilterValue: (d: any) => setVisibility(d),
    filterRange: [1, 1],

    // Define extensions
    extensions: [new DataFilterExtension({ filterSize: 1 })],
  });

  const layers = [cityLevel, monasteries];

  return (
    <div onContextMenu={(evt) => evt.preventDefault()}>
      <MapControls />
      <DeckGL
        viewState={mapState}
        onViewStateChange={(e: any) => dispatchMapState(e.viewState)}
        onClick={(object) => object && dispatchSelectedMonastery(object.object)}
        controller={true}
        layers={layers}
        getTooltip={({ object }) => object && `${object.name}`}
      />
    </div>
  );
};

export default MapComponent;
