import { useState } from 'react';
import { FiEdit, FiSave, FiTrash2, FiCheck } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { patchOneRecord } from '../features/allRecords';
import { setShowModal } from '../features/showModal';

const EditModalControls = ({ elem, editing, setEditing, toggleDelete, editData, displayMsg, setShowErrMsg }) => {
    const dispatch = useDispatch();

    const handleSave = () => {
        if (dataIsEmpty()) return setShowErrMsg(true);

        const prompise = dispatch(patchOneRecord(editData))
        prompise.then(val => {
            if (val.payload) {
                val.payload.status == 200 ?
                    displayMsg(`Successfully Saved Record # ${val.payload.patch.id}`)
                    :
                    displayMsg(`Error! status: ${val.payload.status}`)
            }

            else displayMsg("Error! Request rejected")
        })
        dispatch(setShowModal(false))
    }

    const dataIsEmpty = () => {
        for (const key in editData) {
            editData[key] = editData[key].toString().trim()
            if (editData[key] === "") return true;
        }
        return false;
    }
    const handleToggleDelete = () => {
        setShowErrMsg(false)
        toggleDelete()
    }
    const handleSetEditing = () => {
        setEditing(!editing)
        setShowErrMsg(false)
    }
    return (<>
        {!editing &&
            <button
                onClick={handleToggleDelete}
                className='controlBtn delete'>
                <FiTrash2 /> Delete
            </button>
        }

        <button
            onClick={handleSetEditing}
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
    </>
    )
}

export default EditModalControls