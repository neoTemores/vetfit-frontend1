import { createSlice } from "@reduxjs/toolkit";

export const showModalSlice = createSlice({
    name: "showModal",
    initialState: { value: false },
    reducers: {
        setShowModal: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setShowModal } = showModalSlice.actions;
export default showModalSlice.reducer;