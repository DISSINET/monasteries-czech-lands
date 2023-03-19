import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MainSlice {
  selectedOrderLabels: Array<string>;
  selectedStatusLabels: Array<string>;
}

const initialState: MainSlice = {
  selectedOrderLabels: [],
  selectedStatusLabels: [],
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
  },
});

export const { selectOrders, selectStatuses } = mainSlice.actions;
export default mainSlice.reducer;
