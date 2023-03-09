import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function AllRecords({ allRecordsData, fetchIndividualRecord }) {

    const navigate = useNavigate();
    const handleRecordClicked = (e) => {
        console.log(e.currentTarget.id)
        fetchIndividualRecord(e.currentTarget.id)
        navigate("/api/individual-record")
    }

    return (
        <div className='allRecordsContainer'>
            {allRecordsData.map(elem => (
                <div className='recordCard' key={elem.id} id={elem.userId} onClick={handleRecordClicked}>
                    <h3 className="recordTitle">{elem.title}</h3>
                    <p className="recordBody">{elem.body}</p>
                    <span>By user# {elem.userId}</span>

                </div>
            ))}
        </div>
    )
}

export default AllRecords