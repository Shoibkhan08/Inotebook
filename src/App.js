import './App.css';
import Navbar from './component/Navbar';
import {Home} from './component/Home';
import {About} from './component/About';
import {Routes,Route} from 'react-router-dom';

import { NoteState } from './context/NoteState';
import { Login } from './component/Login';
import { Signup } from './component/Signup';
import { Alert } from './component/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState("")
  
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(" ")
    }, 8000);

  }
  
  return (
    <div className="container-fluid">
      <NoteState>
      <Alert alert={alert}/>
      <Routes>
        <Route path='/' element={<Navbar/>}>
        
          <Route path='/' element={<Home showAlert={showAlert}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/login' element={<Login showAlert={showAlert}/>}/>
          <Route path='/signup' element={<Signup showAlert={showAlert}/>}/>
        </Route>
          
      </Routes>
      
      </NoteState>
    </div>
  );
}

export default App;
