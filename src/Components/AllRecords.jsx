import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Pagination from "./Pagination"
import { setShowModal } from "../features/showModal"
import { setShowMsg } from "../features/showMsg"
import { fetchAllRecords } from "../features/allRecords"
import { fetchIndividualRecord } from "../features/individualRecord"
import { setShowNewRecordModal } from "../features/showNewRecordModal"

const AllRecords = () => {
    const dispatch = useDispatch();
    const recordsToDisplay = useSelector(state => state.recordsToDisplay.value);

    useEffect(() => {
        dispatch(fetchAllRecords())
    }, [])

    const handleRecordClicked = (e) => {
        dispatch(fetchIndividualRecord(e.currentTarget.id))
        dispatch(setShowMsg(false))
        dispatch(setShowModal(true))
    }

    return (
        <div className='allRecordsContainer'>
            <Pagination />
            <button className="addRecordBtn" onClick={() => dispatch(setShowNewRecordModal(true))}>Create Record</button>
            <div className="allRecordsDisplay">
                {recordsToDisplay.map(elem => (
                    <div className='recordCard' key={elem.id} id={elem.id} onClick={handleRecordClicked}>
                        <h3 className="recordTitle">{elem.title}</h3>
                        <p className="recordBody">{elem.body}</p>
                        <div className="cardDataInfo">Record id: {elem.id}</div>
                    </div>
                ))}
            </div>

            <Pagination />
        </div>
    )
}

export default AllRecords