import { FiMinusCircle, FiTrash2 } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { deleteOneRecord } from '../features/allRecords'
import { setShowModal } from '../features/showModal'

const EditModalVerifyDelete = ({ elem, cancelDelete, editData, displayMsg }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const promise = Promise.resolve(dispatch(deleteOneRecord(editData.id)))
        promise.then(val => {
            val.payload.status === 200 ?
                displayMsg(`Successfully Deleted Record # ${val.payload.id}`)
                :
                displayMsg(`Error! status: ${val.payload.status}`)
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