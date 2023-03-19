import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MainSlice {
  selectedOrderLabels: Array<string>;
  selectedStatusLabels: Array<string>;
  timeFilter: Array<number>;
}

const initialState: MainSlice = {
  selectedOrderLabels: [],
  selectedStatusLabels: [],
  timeFilter: [1000, 2023],
};

export const mainSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    selectOrders: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedOrders = action.payload;
      state.selectedOrderLabels = newSelectedOrders;
    },
    selectStatuses: (state, action: PayloadAction<Array<string>>) => {
      let newSelectedStatuses = action.payload;
      state.selectedStatusLabels = newSelectedStatuses;
    },
    setTimeFilter: (state, action: PayloadAction<Array<number>>) => {
      let newTimeFilter = action.payload;
      state.timeFilter = newTimeFilter;
    },
  },
});

export const { selectOrders, selectStatuses, setTimeFilter } =
  mainSlice.actions;
export default mainSlice.reducer;
