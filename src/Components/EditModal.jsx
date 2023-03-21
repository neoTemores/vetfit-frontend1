import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import EditModalControls from './EditModalControls';
import EditModalVerifyDelete from './EditModalVerifyDelete';
import { useDispatch, useSelector } from 'react-redux';
import { setShowModal } from '../features/showModal';
import { setMsgTxt } from "../features/msgText";
import { setShowMsg } from "../features/showMsg";

const EditModal = () => {
    const dispatch = useDispatch();
    const individualRecord = useSelector(state => state.individualRecord.value)

    const [editData, setEditData] = useState({ "id": 0, "title": "", "body": "" })
    const [editing, setEditing] = useState(false)
    const [verifyDelete, setVerifyDelete] = useState(false)

    useEffect(() => {
        individualRecord.length > 0 &&
            setEditData({
                "id": individualRecord[0].id,
                "title": individualRecord[0].title,
                "body": individualRecord[0].body
            })
    }, [individualRecord])

    const displayMsg = (text) => {
        window.scroll(0, 0)
        dispatch(setMsgTxt(text))
        dispatch(setShowMsg(true))
        setTimeout(() => {
            dispatch(setShowMsg(false))
        }, 3000)
    }

    const handleChange = (e) => {
        setEditData(prevData => { return { ...prevData, [e.target.name]: e.target.value } })
    }

    return ReactDOM.createPortal(
        <div className='modalContainer'>

            <div className='modal'>
                <button
                    className="closeModalBtn"
                    onClick={() => dispatch(setShowModal(false))}>
                    <FiX style={{ "fontSize": "1.2rem" }} />
                </button>

                {individualRecord.length === 0 && <h1>Loading ...</h1>}

                {individualRecord.map(elem => (
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

                        <span>Record id: {elem.id}</span>

                        {verifyDelete && <span className='verifyDeleteMsg'>Delete this record?</span>}
                        <div className='editControlsContainer'>

                            {verifyDelete ?
                                <EditModalVerifyDelete
                                    elem={elem}
                                    cancelDelete={() => setVerifyDelete(false)}
                                    editData={editData}
                                    displayMsg={displayMsg}
                                />
                                :
                                <EditModalControls
                                    elem={elem}
                                    editing={editing}
                                    setEditing={setEditing}
                                    toggleDelete={() => setVerifyDelete(true)}
                                    editData={editData}
                                    displayMsg={displayMsg} />
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

