import { createSlice } from "@reduxjs/toolkit";

export const recordsToShowSlice = createSlice({
    name: "recordsToShow",
    initialState: { value: [] },
    reducers: {
        setRecordsToShow: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setRecordsToShow } = recordsToShowSlice.actions;

export default recordsToShowSlice.reducer;