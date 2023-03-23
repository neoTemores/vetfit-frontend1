import ReactDOM from 'react-dom'
import { useState, useRef, useEffect } from 'react'
import { FiX, FiSave } from 'react-icons/fi'
import { useDispatch } from 'react-redux';
import { setMsgTxt } from "../features/msgText";
import { setShowMsg } from "../features/showMsg";
import { setShowNewRecordModal } from '../features/showNewRecordModal';
import { addNewRecord } from '../features/allRecords';

const NewRecordModal = () => {
    const dispatch = useDispatch();
    const titleBox = useRef();
    const [editData, setEditData] = useState({ "title": "", "body": "" })
    const [showErrMsg, setShowErrMsg] = useState(false)

    useEffect(() => {
        titleBox.current.focus();
    }, [])

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

    const handleSave = (e) => {
        e.preventDefault();
        if (dataIsEmpty()) return setShowErrMsg(true);

        const prompise = dispatch(addNewRecord(editData))
        prompise.then(val => {
            if (val.payload) {
                val.payload.status == 200 ?
                    displayMsg(`Successfully Created Record # ${val.payload.newRecord.id}`)
                    :
                    displayMsg(`Error! status: ${val.payload.status}`)
            }

            else displayMsg("Error! Request rejected")
        })
        dispatch(setShowNewRecordModal(false))
    }

    const dataIsEmpty = () => {
        for (const key in editData) {
            editData[key] = editData[key].toString().trim()
            if (editData[key] === "") return true;
        }
        return false;
    }


    return ReactDOM.createPortal(
        <div className='modalContainer'>

            <div className='modal'>
                <button
                    className="closeModalBtn"
                    onClick={() => dispatch(setShowNewRecordModal(false))}>
                    <FiX style={{ "fontSize": "1.2rem" }} />
                </button>

                <form className='individualCard' >

                    <input
                        ref={titleBox}
                        className='editTitleBox'
                        value={editData.title}
                        name="title"
                        onChange={handleChange}
                        placeholder="Enter title... " />

                    <textarea
                        className='editTextArea'
                        value={editData.body}
                        name="body"
                        onChange={handleChange}
                        placeholder="Enter body text..."
                        rows="4"
                        cols="80" />

                    {showErrMsg && <span style={{ color: "red" }}>Fields can not be blank</span>}

                    <div className='editControlsContainer'>

                        <button
                            type='submit'
                            onClick={handleSave}
                            className='controlBtn save'>
                            <FiSave /> Save
                        </button>


                    </div>
                </form>


            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default NewRecordModal

