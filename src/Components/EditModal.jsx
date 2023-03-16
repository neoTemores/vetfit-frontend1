import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FiX } from 'react-icons/fi'
import EditModalControls from './EditModalControls';
import EditModalVerifyDelete from './EditModalVerifyDelete';

const EditModal = ({ setShowModal, individualRecordData, setAllRecordsData, patchRecord, deleteRecord }) => {

    const [editData, setEditData] = useState({ "title": "", "body": "" })
    const [editing, setEditing] = useState(false)
    const [verifyDelete, setVerifyDelete] = useState(false)

    useEffect(() => {
        individualRecordData.length > 0 &&
            setEditData({
                "title": individualRecordData[0].title,
                "body": individualRecordData[0].body
            })
    }, [individualRecordData])

    const handleDelete = (e) => {

        setAllRecordsData(prevData => { return prevData.filter(elem => +elem.id !== +e.target.dataset.id) })
        deleteRecord(e.currentTarget.dataset.id)
        setShowModal(false)
    }

    const handleSave = (e) => {

        setAllRecordsData(prevData => {
            prevData.forEach(elem => {
                if (+elem.id === +e.currentTarget.dataset.id) {
                    elem.title = editData.title
                    elem.body = editData.body
                }
            })
            return prevData
        })

        patchRecord(e.currentTarget.dataset.id, editData)
        setShowModal(false)
    }
    const handleChange = (e) => {
        setEditData(prevData => { return { ...prevData, [e.target.name]: e.target.value } })
    }

    return ReactDOM.createPortal(
        <div className='modalContainer'>

            <div className='modal'>
                <button
                    className="closeModalBtn"
                    onClick={() => setShowModal(false)}>
                    <FiX style={{ "fontSize": "1.2rem" }} />
                </button>

                {individualRecordData.length === 0 && <h1>Loading ...</h1>}

                {individualRecordData.map(elem => (
                    <div className='individualCard' key={elem.id} id={elem.userId}>

                        {editing ?
                            <input
                                className='editTitleBox'
                                value={editData.title}
                                name="title"
                                onChange={handleChange} />
                            :
                            <h3 className="recordTitle">{editData.title}</h3>
                        }

                        {editing ?
                            <textarea
                                className='editTextArea'
                                value={editData.body}
                                name="body"
                                onChange={handleChange}
                                rows="4"
                                cols="80" />
                            :
                            <p className="recordBody">{editData.body}</p>
                        }

                        <span>By User: {elem.userId}, Record Id: {elem.id}</span>

                        {verifyDelete && <span className='verifyDeleteMsg'>Delete this record?</span>}
                        <div className='editControlsContainer'>

                            {verifyDelete ?
                                <EditModalVerifyDelete
                                    elem={elem}
                                    cancelDelete={() => setVerifyDelete(false)}
                                    handleDelete={handleDelete}
                                />
                                :
                                <EditModalControls
                                    elem={elem}
                                    editing={editing}
                                    setEditing={setEditing}
                                    toggleDelete={() => setVerifyDelete(true)}
                                    handleSave={handleSave} />
                            }



                        </div>
                    </div>
                ))}

            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default EditModal

