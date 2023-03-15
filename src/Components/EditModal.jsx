import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FiEdit, FiSave, FiTrash2, FiX, FiCheck } from 'react-icons/fi'

const EditModal = ({ setShowModal, individualRecordData, setAllRecordsData, patchRecord, deleteRecord }) => {

    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({ "title": "", "body": "" })

    useEffect(() => {
        individualRecordData.length > 0 &&
            setEditData({
                "title": individualRecordData[0].title,
                "body": individualRecordData[0].body
            })
    }, [individualRecordData])

    const handleDelete = (e) => {
        // SHOULD WE VALIDATE DELETION ? CREATE NEW STATE AND RENDER NEW CONTROL BUTTONS YES/NO

        setAllRecordsData(prevData => { return prevData.filter(elem => +elem.id !== +e.target.dataset.id) })
        deleteRecord(e.target.dataset.id)
        setShowModal(false)
    }

    const handleEdit = () => { setEditing(!editing) }

    const handleSave = (e) => {

        setAllRecordsData(prevData => {
            prevData.forEach(elem => {
                if (+elem.id === +e.target.dataset.id) {
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

                        <span>By user# {elem.userId}, Record Id: {elem.id}</span>

                        <div className='editControlsContainer'>
                            {!editing &&
                                <button
                                    data-id={elem.id}
                                    onClick={handleDelete}
                                    className='controlBtn delete'>
                                    <FiTrash2 /> Delete
                                </button>
                            }

                            <button
                                onClick={handleEdit}
                                className='controlBtn edit'>
                                {editing ?
                                    <>Done Editing <FiCheck style={{ "color": "green", "fontSize": "1.5rem" }} /></>
                                    :
                                    <><FiEdit /> Edit</>
                                }
                            </button>

                            {!editing &&
                                <button
                                    data-id={elem.id}
                                    onClick={handleSave}
                                    className='controlBtn save'>
                                    <FiSave /> Save
                                </button>
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

