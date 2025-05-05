import React ,{useState}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function CreateTodo() {
  const navigate= useNavigate();
  const[data,setData]=useState([{
    title:"",
    description:"",
    current:"",
    reminder:"",
}])
//create todo task
const submithandle =(e)=>{
  e.preventDefault()
  axios.post('http://localhost:4000/dynamic',{data})
  .then((data)=>{
    if(data.title !==" "){
      alert("create todo succesfully")
    navigate("/Navbar")
    }
  })
  .catch(err=>{
    console.log( 'failed to post the data',err)
  })
  
}
const update=(e,i)=>{
  const New=[...data];
    New[i][e.target.name]=e.target.value;
    setData(New);
}
const adding=()=>{
  setData([...data,{
    title:"",
    description:"",
    current:"",
    reminder:"",
}])
}
  return (
    <div className=' bg-gray-700 h-svh'>
<div className=' bg-gray-700 h-[screen-vh] '>
<h1 className=' font-Oswald h-[71px] width-[200px]  ml-[595px] text-white text-4xl pt-[15px]  font-bold'>Create Todo</h1>
<div>
        {
           data.map((val,i)=>(
          <div key={i} className='h-[222px] w-[400px] rounded-[40px] mt-4 relative top-[10px] pt-5 ml-[500px] shadow-xl border-2 border-solid border-blue-500'>
       <input className='border-2 border-black mt-[4px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='text' name='title' value={val.title} onChange={(e)=>update(e,i)}  placeholder='Create Task'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='text' name='description' value={val.description} onChange={(e)=>update(e,i)}  placeholder='Description'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='datetime-local'name='current' value={val.current} onChange={(e)=>update(e,i)}  ></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='datetime-local' name='reminder' value={val.reminder} onChange={(e)=>update(e,i)} ></input><br></br>
       </div>
           )
          )
     }
      </div>
      <div className='ml-[470px] '>
      <button className='shadow-xl border-2 border-solid border-blue-500 mt-6 ml-[60px] rounded-[10px] w-[151px] h-[40px] font-semibold font-inder text-pink-500' type='submit' onClick={submithandle}>Create Todo</button>
      <button className='shadow-xl border-2 border-solid border-blue-500 mt-6 ml-[35px] rounded-[10px] w-[151px] h-[40px] font-semibold font-inder text-btn'  onClick={adding}>Add Todo</button> 
      </div>
</div>
</div>
  )
}
export default CreateTodo