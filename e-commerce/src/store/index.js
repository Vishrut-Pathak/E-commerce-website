import {configureStore} from "@reduxjs/toolkit";
import itemSlice from "./itemSlice";
import fetchStatusSlice from "./fetchStatusSlice";
import bagSlice from "./bagSlice";
import authSlice from "./authSlice";
import filterSlice from "./filterSlice";

const myntraStore = configureStore({
    reducer: {
        items: itemSlice.reducer,
        fetchStatus: fetchStatusSlice.reducer,
        bag: bagSlice.reducer,
        auth: authSlice.reducer,
        filter: filterSlice.reducer,
    }
});

export default myntraStore;