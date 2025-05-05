import React,{useState} from 'react'
import Todolist from './Todolist'
function Sample() {
    const[todos,setTodos]=useState([])
    const[task,setTask]=useState("")
const handle=(e)=>{
    setTask(e.target.value);
}
const handlesubmit=(e)=>{
    e.preventDefault()
    const newtodo=[...todos,task];
    setTodos(newtodo);
    setTask("");
}
  return (
    <div>
        <form onSubmit={handlesubmit}>
            <input className='bg-orange-500' type='text' value={task} onChange={handle}></input>
            <button type='submit'>Add</button>
        </form>
        <Todolist todolist={todos}/>
    </div>
  )
}

export default Sample