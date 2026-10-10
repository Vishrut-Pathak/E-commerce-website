import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    activeCategory: "all",
    searchQuery: ""
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload || "all";
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload || "";
    },
    clearSearch: (state) => {
      state.searchQuery = "";
    }
  }
});

export const filterActions = filterSlice.actions;
export default filterSlice;
