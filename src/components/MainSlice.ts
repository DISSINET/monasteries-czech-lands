import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MainSlice {
  selectedOrderIDs: Array<string>;
  selectedStatusIDs: Array<string>;
  timeFilter: Array<number>;
  selectedMonastery: Object;
}

const initialState: MainSlice = {
  selectedOrderIDs: [],
  selectedStatusIDs: [],
  timeFilter: [1000, 2023],
  selectedMonastery: {},
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
    setTimeFilter: (state, action: PayloadAction<Array<number>>) => {
      let newTimeFilter = action.payload;
      state.timeFilter = newTimeFilter;
    },
    selectMonastery: (state, action: PayloadAction<Object>) => {
      let newSelectedMonastery = action.payload;
      state.selectedMonastery = newSelectedMonastery;
    },
  },
});

export const { selectOrders, selectStatuses, setTimeFilter, selectMonastery } =
  mainSlice.actions;
export default mainSlice.reducer;
