import { createSlice } from "@reduxjs/toolkit";

export const showMsgSlice = createSlice({
    name: "showMsg",
    initialState: { value: false },
    reducers: {
        setShowMsg: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setShowMsg } = showMsgSlice.actions;

export default showMsgSlice.reducer;