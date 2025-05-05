import React ,{useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function Copytodo() {
  const {id} = useParams();
  console.log(id);
  
  const navigate= useNavigate();
  const[data,setData]=useState([]);
const{title,description,current,reminder}=data;
const handletodo=(e)=>{
  setData({...data,[e.target.name]:e.target.value})
}
//get the todo by id
useEffect(()=>{
  axios.get(`http://localhost:4000/todo1/${id}`)
  // .then((response)=>response.json())
  .then((response)=>{
    const todo =response.data[0];
    console.log(todo);
    
     setData({
       ...todo,
       current:todo.current.slice(0,16),
       reminder:todo.reminder.slice(0,16)
     })  
  })
  .catch(err=>{
    console.log( 'failed to post the data',err)
  })
},[id]);
  //update the todotask
const sumbmitHandle=(e)=>{
 e.preventDefault();
 axios.post(`http://localhost:4000/todo`,data)
 .then(()=>{
  alert("todo copy successfull");
   navigate('/Navbar')
 })
 .catch(err=>{
   console.log( 'failed to post the data',err)
   
 })
}
  return (
<div className=' bg-gray-700 h-[640px] '>
<div  className=' h-[272px] w-[400px] rounded-[10px] relative top-[150px] ml-[500px] shadow-xl border-2 border-solid border-blue-600  '>
       <form onSubmit={sumbmitHandle}>
       <input className='border-2 border-black mt-[30px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='text' name='title' value={title} onChange={handletodo}  placeholder='Create Task'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='text' name='description' value={description} onChange={handletodo}  placeholder='Description'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='datetime-local'name='current' value={current} onChange={handletodo}  ></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[50px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='datetime-local' name='reminder' value={reminder} onChange={handletodo} ></input><br></br>
      <button className='bg-btn mt-3 ml-[50px] rounded-[10px] w-[301px] h-[30px] font-semibold font-inder' type='submit'>Copy Todo</button> 
      </form>
      </div>
</div>
  ) 
}
export default Copytodo