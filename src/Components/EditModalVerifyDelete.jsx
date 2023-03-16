import { FiEdit, FiMinusCircle, FiTrash2, FiCheck } from 'react-icons/fi'

const EditModalVerifyDelete = ({ elem, cancelDelete, handleDelete }) => {
    return (
        <>
            <button className='controlBtn save' onClick={cancelDelete}><FiMinusCircle /> No</button>
            <button className='controlBtn delete' data-id={elem.id} onClick={handleDelete}><FiTrash2 /> Yes</button>
        </>
    )
}

export default EditModalVerifyDelete