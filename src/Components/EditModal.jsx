import { useState } from 'react'
import ReactDOM from 'react-dom'

const EditModal = ({ setShowModal, individualRecordData }) => {

    const [editing, setEditing] = useState(false);

    const handleDelete = () => {

    }
    const handleEdit = () => {
        setEditing(!editing)
    }
    const handleSave = () => {

    }

    return ReactDOM.createPortal(
        <div className='modalContainer'>
            <div className='modal'>
                <button className="closeModalBtn" onClick={() => setShowModal(false)}>X</button>
                {individualRecordData.length === 0 && <h1>Loading ...</h1>}
                {individualRecordData.map(elem => (
                    <div className='individualCard' key={elem.id} id={elem.userId}>

                        {editing ? <input className='editTitleBox' value={elem.title} />
                            : <h3 className="recordTitle">{elem.title}</h3>}
                        {editing ? <textarea className='editTextArea' value={elem.body} rows="5" cols="80" />
                            : <p className="recordBody">{elem.body}</p>}

                        <span>By user# {elem.userId}, Record Id: {elem.id}</span>

                        <div className='editControlsContainer'>
                            {!editing && <button onClick={handleDelete} className='controlBtn'>Delete</button>}
                            <button onClick={handleEdit} className='controlBtn'>{editing ? "Done Editing" : "Edit"}</button>
                            {!editing && <button onClick={handleSave} className='controlBtn'>Save</button>}
                        </div>
                    </div>
                ))}

            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default EditModal

