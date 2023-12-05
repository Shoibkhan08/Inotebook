import React, { useContext, useState } from 'react'
import noteContext from '../context/NoteContext'

export const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        console.log(`This note is add`)
        props.showAlert("Add note seccessfully", "success")
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        console.log(e.target.name, e.target.value)
    }
    return (
        <>
            <div className="container">

                <h1 className='text-primary'>This is my inotebook</h1>
            </div>
            <div className="container d-flex justify-content-center">
                <form className='w-100'>
                    <div className="col-lg-8 mx-auto">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} placeholder="title" minLength={3} required />

                        <label htmlFor="Description" className="col-form-label">Description</label>
                        <input type="text" id="Description" name='description'  className="form-control" placeholder='Description' onChange={onChange} aria-describedby="passwordHelpInline" minLength={3} required />

                        <label htmlFor="tag" className="col-form-label">Tag</label>
                        <input type="text" id="tag" name='tag' className="form-control"  placeholder='tag' onChange={onChange} aria-describedby="passwordHelpInline" minLength={3} required/>
                        <button disabled={note.title.length < 3 || note.description.length < 3 || note.tag.length < 3} type="submit" className="btn btn-primary my-4 " onClick={handleClick}>Add Note</button>
                    </div>
                </form>
            </div>
        </>
    )
}
