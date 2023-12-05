import React, { useContext, useEffect, useRef,useState } from 'react'
import notecontext from '../context/NoteContext'
import { Noteitem } from './Noteitem';
import { AddNote } from './AddNote'

export const Notes = (props) => {
  const context = useContext(notecontext)
  const { notes, getNotes ,editNote} = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }else{
      window.location.href = '/login'
    }
  }, [getNotes])
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  
  const ref = useRef(null)

  const updateNote=(currentNote)=>{
    ref.current.click()
    setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  }
  const refClose = useRef(null)
    const handleClick =()=>{
        // e.preventDefault();
        refClose.current.click()
        editNote(note.id,note.etitle,note.edescription,note.etag)
        console.log(`Updating the note`,note)
        props.showAlert("Update note seccessfully", "success")


    }
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
        console.log(e.target.name, e.target.value)
    }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form action="" className='w-100'>
                    <div className="col-lg-8 mx-auto">
                        <label htmlFor="etitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name='etitle' minLength={5} required value={note.etitle} onChange={onChange} placeholder="title" />
                    
                        <label htmlFor="eDescription" className="col-form-label">Description</label>
                        <input type="text" id="eDescription" name='edescription' minLength={5} required className="form-control" placeholder='Description'value={note.edescription} onChange={onChange}  aria-describedby="passwordHelpInline" />

                        <label htmlFor="etag" className="col-form-label">Tag</label>
                        <input type="text" id="etag" name='etag' minLength={5} required className="form-control" placeholder='tag' onChange={onChange} value={note.etag} aria-describedby="passwordHelpInline" />
                    </div>
                </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-4">
        
        <h1>Your notes</h1>
        <div className="row ">
          {notes.length===0  &&  `No Notes to display`}
          {
            notes.map((note) => {
              return <Noteitem updateNote={updateNote} note={note} uniq={note._id} showAlert={props.showAlert}/>
            })
          }

        </div>


      </div>
    </>
  )
}
