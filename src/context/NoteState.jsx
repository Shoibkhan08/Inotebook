import NoteContext from "./NoteContext";
import { useState } from "react";

export const NoteState = (props) => {
  const Initialnotes = ['']
  const [notes, setNotes] = useState(Initialnotes)
  //Call api
  const port = 5000;
  const host = `http://localhost:${port}`
  //GET a Note
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json);
    // console.log("getNote", {json})
  }
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
    });
    const json = await response.json()
    setNotes(notes.concat(json))
    console.log("addnote",{json})

  }
  //Delete a Note
  const deleteNote = async (_id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    })
    const json = await response.json()
    console.log("DELETE Note" ,{json})


    console.log("This is Note is Deleted with id - " + _id)
    const newNote = notes.filter((note) => { return note._id !== _id })
    setNotes(newNote)
  }
  //Edit a Note
  const editNote = async (_id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    })
    const json = await response.json()
    console.log({json})
    let newNote = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === _id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
      setNotes(newNote);
  }
  let a = "sazidkhan"
  return (

    <>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, name: a }}>
        {props.children}
      </NoteContext.Provider>
    </>
  )
}
