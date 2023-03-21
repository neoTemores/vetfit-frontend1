import { createSlice } from "@reduxjs/toolkit";

export const msgTextSlice = createSlice({
    name: "msgText",
    initialState: { value: "" },
    reducers: {
        setMsgTxt: (state, action) => {
            state.value = action.payload
        },
    }
})

export const { setMsgTxt } = msgTextSlice.actions;
export default msgTextSlice.reducer;