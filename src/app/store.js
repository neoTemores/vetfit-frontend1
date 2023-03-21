import { configureStore } from "@reduxjs/toolkit";
import allRecordsReducer from '../features/allRecords'
import recordsToShowReducer from "../features/recordsToShow"
import startIndexReducer from '../features/startIndex';
import endIndexReducer from "../features/endIndex"
import individualRecordReducer from '../features/individualRecord';
import showModalReducer from '../features/showModal';
import showMsgReducer from '../features/showMsg';
import msgTextReducer from '../features/msgText';

export const store = configureStore({
    reducer: {
        allRecords: allRecordsReducer,
        recordsToShow: recordsToShowReducer,
        startIndex: startIndexReducer,
        endIndex: endIndexReducer,
        individualRecord: individualRecordReducer,
        showModal: showModalReducer,
        showMsg: showMsgReducer,
        msgText: msgTextReducer,
    },
});
