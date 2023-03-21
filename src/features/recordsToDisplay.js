import { createSlice } from "@reduxjs/toolkit";

export const recordsToDisplaySlice = createSlice({
    name: "recordsToDisplay",
    initialState: { value: [] },
    reducers: {
        setRecordsToDisplay: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setRecordsToDisplay } = recordsToDisplaySlice.actions;

export default recordsToDisplaySlice.reducer;