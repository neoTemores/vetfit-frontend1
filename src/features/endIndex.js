import { createSlice } from "@reduxjs/toolkit";

export const endIndexSlice = createSlice({
    name: "endIndex",
    initialState: { value: 10 },
    reducers: {
        setEndIndex: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { setEndIndex } = endIndexSlice.actions;

export default endIndexSlice.reducer