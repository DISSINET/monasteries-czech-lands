import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Monastery } from "./../types";

export interface MainSlice {
  selectedOrderIDs: Array<string>;
  selectedStatusIDs: Array<string>;
  selectedDedications: Array<any>;
  timeFilter: Array<number>;
  undated: boolean;
  selectedMonastery: Monastery;
  locationCount: number;
}

const initialState: MainSlice = {
  selectedOrderIDs: [],
  selectedStatusIDs: [],
  selectedDedications: [],
  timeFilter: [1000, 2023],
  undated: true,
  selectedMonastery: <Monastery>{},
  locationCount: 0,
};

export const mainSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    selectOrders: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedOrders = action.payload;
      state.selectedOrderIDs = newSelectedOrders;
    },
    selectStatuses: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedStatuses = action.payload;
      state.selectedStatusIDs = newSelectedStatuses;
    },
    selectDedications: (state, action: PayloadAction<Array<any>>) => {
      let newSelectedDedications = action.payload;
      state.selectedDedications = newSelectedDedications;
    },
    setTimeFilter: (state, action: PayloadAction<Array<number>>) => {
      let newTimeFilter = action.payload;
      state.timeFilter = newTimeFilter;
    },
    selectMonastery: (state, action: PayloadAction<Monastery>) => {
      let newSelectedMonastery = action.payload;
      state.selectedMonastery = newSelectedMonastery;
    },
    setUndated: (state, action: PayloadAction<boolean>) => {
      let newUndatedState = action.payload;
      state.undated = newUndatedState;
    },
    setLocationCount: (state, action: PayloadAction<number>) => {
      let newLocationCount = action.payload;
      state.locationCount = newLocationCount;
    },
  },
});

export const {
  selectOrders,
  selectStatuses,
  setTimeFilter,
  selectDedications,
  selectMonastery,
  setUndated,
  setLocationCount,
} = mainSlice.actions;
export default mainSlice.reducer;
