import { useEffect } from "react"
import Pagination from "./Pagination"

const AllRecords = ({ fetchAllRecords, recordsToShow, fetchIndividualRecord, setShowModal, setStartIndex, setEndIndex, startIndex, endIndex, allRecordsLength, setShowMsg }) => {

    useEffect(() => {
        fetchAllRecords()
    }, [])

    const handleRecordClicked = (e) => {
        fetchIndividualRecord(e.currentTarget.id)
        setShowMsg(false)
        setShowModal(true)
    }

    const createPagination = () => {
        return <Pagination
            setStartIndex={setStartIndex}
            setEndIndex={setEndIndex}
            endIndex={endIndex}
            startIndex={startIndex}
            allRecordsData={recordsToShow}
            allRecordsLength={allRecordsLength} />
    }

    return (
        <div className='allRecordsContainer'>
            {createPagination()}

            <div className="allRecordsDisplay">
                {recordsToShow.map(elem => (
                    <div className='recordCard' key={elem.id} id={elem.id} onClick={handleRecordClicked}>
                        <h3 className="recordTitle">{elem.title}</h3>
                        <p className="recordBody">{elem.body}</p>
                        <div className="cardDataInfo">By user# {elem.userId}, Record id: {elem.id}</div>
                    </div>
                ))}
            </div>

            {createPagination()}
        </div>
    )
}

export default AllRecords