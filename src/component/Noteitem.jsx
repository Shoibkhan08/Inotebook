// import React from 'react'
import * as React  from 'react';
import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditNoteTwoToneIcon from '@mui/icons-material/EditNoteTwoTone';
import noteContext from '../context/NoteContext';

export const Noteitem = (props) => {
    const Context = useContext(noteContext);
    const {deleteNote} = Context;
    const { note ,updateNote,showAlert} = props;
    return (
        <>
            <div className="col-lg-3 p-2">
                <div className="card ">
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                            {note.title}
                            <Grid item>
                                <DeleteTwoToneIcon className='mx-2' style={{cursor:'pointer'}} onClick={()=>{deleteNote(note._id);
                                showAlert("Delete note seccessfully", "success")}} />
                                <EditNoteTwoToneIcon  style={{cursor:'pointer'}} onClick={()=>{updateNote(note)}}/>
                            </Grid>
                            
                        </h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">Tag:{note.tag}</p>
                        <a href="/" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>a
            </div>
        </>
    )
}
