import { FiMinusCircle, FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneRecord } from '../features/allRecords'
import { setShowModal } from '../features/showModal'
import { setStartIndex } from '../features/startIndex'
import { setEndIndex } from '../features/endIndex'

const EditModalVerifyDelete = ({ elem, cancelDelete, editData, displayMsg }) => {
    const dispatch = useDispatch();
    const recordsToDisplay = useSelector(state => state.recordsToDisplay.value);

    const handleDelete = async () => {
        const promise = Promise.resolve(dispatch(deleteOneRecord(editData.id)))
        promise.then(val => {
            if (val.payload) {
                val.payload.status === 200 ?
                    displayMsg(`Successfully Deleted Record # ${val.payload.id}`)
                    :
                    displayMsg(`Error! status: ${val.payload.status}`)
            }
            else displayMsg("Error! Request rejected")

            if (recordsToDisplay.length === 1) {
                dispatch(setStartIndex(-10))
                dispatch(setEndIndex(-10))
            }
        })

        dispatch(setShowModal(false))

    }
    return (
        <>
            <button className='controlBtn save' onClick={cancelDelete}><FiMinusCircle /> No</button>
            <button className='controlBtn delete' data-id={elem.id} onClick={handleDelete}><FiTrash2 /> Yes</button>
        </>
    )
}

export default EditModalVerifyDelete