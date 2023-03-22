import { createSlice } from "@reduxjs/toolkit";

export const showNewRecordModalSlice = createSlice({
    name: "showNewRecordModal",
    initialState: { value: false },
    reducers: {
        setShowNewRecordModal: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setShowNewRecordModal } = showNewRecordModalSlice.actions;
export default showNewRecordModalSlice.reducer;