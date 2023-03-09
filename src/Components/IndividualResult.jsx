import React, { useEffect } from 'react'

function IndividualRecord({ individualRecordData }) {

    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div className='individualRecordContainer allRecordsContainer'>
            {individualRecordData[0] && <h2>All records by user# {individualRecordData[0].userId}</h2>}
            <br />
            {individualRecordData.map(elem => (
                <div className='recordCard individualCard' key={elem.id} id={elem.userId}>
                    <h3 className="recordTitle">{elem.title}</h3>
                    <p className="recordBody">{elem.body}</p>
                    <span>By user# {elem.userId}</span>
                </div>
            ))}
        </div>
    )
}

export default IndividualRecord