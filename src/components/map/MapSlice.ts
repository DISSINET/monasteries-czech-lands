import { createSlice } from "@reduxjs/toolkit";

export interface MapState {
  //  center: LatLngTuple;
  zoom: number;
  maxZoom: number;
  minZoom: number;
}

const initialState: MapState = {
  //  center: [46, 7],
  zoom: 6,
  maxZoom: 8,
  minZoom: 4,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    restoreDefaultMapPosition: (state) => {
      //      state.center = initialState.center;
      state.zoom = initialState.zoom;
    },
  },
});

export const { restoreDefaultMapPosition } = mapSlice.actions;
export default mapSlice.reducer;
