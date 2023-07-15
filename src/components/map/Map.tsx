import DeckGL from "@deck.gl/react/typed";
import { DataFilterExtension } from "@deck.gl/extensions/typed";
import { BitmapLayer, ScatterplotLayer } from "@deck.gl/layers/typed";
import locations from "../../data/monasteries.json";
import { TileLayer } from "@deck.gl/geo-layers/typed";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { updateMapState } from "./MapSlice";
import { selectMonastery } from "./../MainSlice";
import MapControls from "./MapControls";
import MapScale from "./MapScale";

const MapComponent = ({}): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);
  const selectedOrderIDs = useAppSelector(
    (state) => state.main.selectedOrderIDs
  );
  const selectedStatusIDs = useAppSelector(
    (state) => state.main.selectedStatusIDs
  );
  const selectedDedications = useAppSelector(
    (state) => state.main.selectedDedications
  );
  const selectedMonastery = useAppSelector(
    (state) => state.main.selectedMonastery
  );
  const timeFilter = useAppSelector((state) => state.main.timeFilter);

  const dispatch = useAppDispatch();

  function dispatchMapState(val: any) {
    dispatch(updateMapState(val));
  }

  function dispatchSelectedMonastery(mon: any) {
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
    // we look for overlapping interval
    // for intervals [a,b], [c,d]:
    // b > c && a < d

    let is_comm = [];
    let is_stat = [];
    let is_ded = [];
    if (selectedOrderIDs.length === 0) {
      is_comm = item.communities.map((c: any) => {
        return (c.time[2] || c.time[3]) >= timeFilter[0] &&
          (c.time[0] || c.time[1]) <= timeFilter[1]
          ? 1
          : 0;
      });
    } else {
      is_comm = item.communities.map((c: any) => {
        return selectedOrderIDs.includes(c.order) &&
          (c.time[2] || c.time[3]) >= timeFilter[0] &&
          (c.time[0] || c.time[1]) <= timeFilter[1]
          ? 1
          : 0;
      });
    }
    if (selectedStatusIDs.length === 0) {
      is_stat = item.statuses.map((c: any) => {
        return (c.time[2] || c.time[3]) >= timeFilter[0] &&
          (c.time[0] || c.time[1]) <= timeFilter[1]
          ? 1
          : 0;
      });
    } else {
      is_stat = item.statuses.map((c: any) => {
        return selectedStatusIDs.includes(c.status) &&
          (c.time[2] || c.time[3]) >= timeFilter[0] &&
          (c.time[0] || c.time[1]) <= timeFilter[1]
          ? 1
          : 0;
      });
    }
    if (selectedDedications.length === 0) {
      if ("dedications" in item) {
        is_ded = item.dedications.map((c: any) => {
          return (c.time[2] || c.time[3]) >= timeFilter[0] &&
            (c.time[0] || c.time[1]) <= timeFilter[1]
            ? 1
            : 0;
        });
      } else {
        is_ded = [0];
      }
    } else {
      if ("dedications" in item) {
        is_ded = item.dedications.map((c: any) => {
          return matchDedications(selectedDedications, c.dedication) &&
            (c.time[2] || c.time[3]) >= timeFilter[0] &&
            (c.time[0] || c.time[1]) <= timeFilter[1]
            ? 1
            : 0;
        });
      } else {
        is_ded = [0];
      }
    }
    return is_comm.includes(1) && is_stat.includes(1) && is_ded.includes(1)
      ? 1
      : 0;
  }

  function matchDedications(selectedDedications: Array<string>, ded: string) {
    let matching = selectedDedications.filter((e) => ded.includes(e));
    return matching.length;
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
    // hover buffer around object
    pickingRadius: 50,
    // props added by DataFilterExtension
    getFilterValue: (d: any) => setVisibility(d),
    // like useEffect <function>:<value change that triggers rerun>
    updateTriggers: {
      getFilterValue: [
        selectedOrderIDs,
        selectedStatusIDs,
        selectedDedications,
        timeFilter,
      ],
    },
    filterRange: [1, 1],

    // Define extensions
    extensions: [new DataFilterExtension({ filterSize: 1 })],

    // On click
    onClick: (object) => object && dispatchSelectedMonastery(object.object),

    // prevent Z-fighting in tilted view
    parameters: {
      depthTest: false,
    },
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
        getTooltip={({ object }) => object && `${object.name}`}
        getCursor={({ isDragging }) => (isDragging ? "arrow" : "arrow")}
      />
    </div>
  );
};

export default MapComponent;
