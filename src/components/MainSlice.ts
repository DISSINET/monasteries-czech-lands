import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Monastery } from "./../types";

export interface MainSlice {
  selectedOrderIDs: Array<string>;
  selectedStatusIDs: Array<string>;
  selectedDedications: Array<string>;
  timeFilter: Array<number>;
  selectedMonastery: Monastery;
}

const initialState: MainSlice = {
  selectedOrderIDs: [],
  selectedStatusIDs: [],
  selectedDedications: [],
  timeFilter: [1000, 2023],
  selectedMonastery: <Monastery>{},
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
    selectDedications: (state, action: PayloadAction<Array<string>>) => {
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
  },
});

export const {
  selectOrders,
  selectStatuses,
  setTimeFilter,
  selectDedications,
  selectMonastery,
} = mainSlice.actions;
export default mainSlice.reducer;
