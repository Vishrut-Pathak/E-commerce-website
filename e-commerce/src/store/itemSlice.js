import {createSlice} from "@reduxjs/toolkit";


const itemSlice = createSlice({
    name: 'items',
    initialState:[] ,
    reducers: {
        addInitialItems:(state, action) => {
            return action.payload || [];
        },
        addCategoryItems:(state, action) => {
            const newItems = action.payload || [];
            const existingIds = new Set(state.map(item => String(item.id)));
            const toAdd = newItems.filter(item => !existingIds.has(String(item.id)));
            return [...state, ...toAdd];
        }
    }
});

export const itemsActions = itemSlice.actions;
export default itemSlice;

