import React from 'react'
import Signin from './Signin';
import Signup from './Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import CreateTodo from './CreateTodo';
import Navbar from './Navbar';
import Sample from './Sample';
import Edittodo from './Edittodo';
import Copytodo from './Copytodo';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signin/>}> </Route>
        <Route path="/Signup" element={<Signup/>}> </Route>
        <Route path="/CreateTodo" element={<CreateTodo/>}> </Route>
        <Route path="/Navbar" element={<Navbar/>}> </Route>
        <Route path="/Sample" element={<Sample/>}> </Route>
        <Route path="/Edittodo/:id" element={<Edittodo/>}> </Route>
        <Route path="/Copytodo/:id" element={<Copytodo/>}> </Route>
      </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App