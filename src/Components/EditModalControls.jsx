import { FiEdit, FiSave, FiTrash2, FiCheck } from 'react-icons/fi'

const EditModalControls = ({ elem, editing, setEditing, toggleDelete, handleSave }) => {

    return (<>
        {!editing &&
            <button
                onClick={toggleDelete}
                className='controlBtn delete'>
                <FiTrash2 /> Delete
            </button>
        }

        <button
            onClick={() => setEditing(!editing)}
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