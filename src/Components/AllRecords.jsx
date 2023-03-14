import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function AllRecords({ allRecordsData, fetchIndividualRecord, setShowModal }) {

    const navigate = useNavigate();
    const handleRecordClicked = (e) => {
        fetchIndividualRecord(e.currentTarget.id)
        // navigate("/api/individual-record")
        setShowModal(true)
    }

    return (
        <div className='allRecordsContainer'>
            {allRecordsData.map(elem => (
                <div className='recordCard' key={elem.id} id={elem.id} onClick={handleRecordClicked}>
                    <h3 className="recordTitle">{elem.title}</h3>
                    <p className="recordBody">{elem.body}</p>
                    <span>By user# {elem.userId}, Record id: {elem.id}</span>

                </div>
            ))}
        </div>
    )
}

export default AllRecords