import { createSlice } from "@reduxjs/toolkit";

export const startIndexSlice = createSlice({
    name: "startIndex",
    initialState: { value: 0 },
    reducers: {
        setStartIndex: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { setStartIndex } = startIndexSlice.actions;
export default startIndexSlice.reducer;