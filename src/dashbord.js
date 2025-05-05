import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Dashbord() {
  const navigate = useNavigate()
  return (
    <div>
        <div className='bg-slate-300 flex  place-content-evenly  mt-[550px] w-[1360px] h-[84px]'>
        <h1 className=' italic  text-pink-900  h-[71px] width-[200px] pt-[25px] text-2xl  font-bold'><Link to="/CreateTodo">Create Task</Link></h1>
        <h1 className=' italic  text-pink-900  h-[71px] width-[200px] pt-[25px] text-2xl  font-bold'>View  Task</h1>
        <h1 className=' italic text-red-700 text-2xl pt-[25px] font-bold'onClick={()=>navigate('/')}>Sign Out</h1>
        </div>
    </div>
  )
}

export default Dashbord