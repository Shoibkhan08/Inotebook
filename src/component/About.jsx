import React,{useContext} from 'react'
import noteContext from '../context/NoteContext';

export const About = () => {
    const {name} = useContext(noteContext);
  return (
    <div>About - {name}</div>
  )
}
