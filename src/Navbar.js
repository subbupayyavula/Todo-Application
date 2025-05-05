
import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  const[user,setUser]=useState([]);
  const[filterUser,setFilterUser]=useState([]);
  const[date,setDate]=useState("");
  const[search,setSearch]=useState("");
  const [offset,setOffset]=useState(0)
  const[status,setStatus]=useState("");
  console.log(date);
  
  useEffect(()=>{ 
    fetch(`http://localhost:4000/todo?offset=${offset}&limit=10`)
    .then((response)=>response.json())
    .then((data)=>{
      setUser(()=>[...user,...data]);
    })
    .catch((err)=>{
      console.log(err);
      
    })
  },[offset])
  useEffect(()=>{
    fetch(`http://localhost:4000/todo?status=${status}&offset=${offset}&limit=10`)
    .then((response)=>response.json())
    .then((data)=>{
      setUser(data)
    })
    .catch((err)=>{
      console.log(err);
      
    })
  },[status])
  useEffect(()=>{
  setFilterUser(user);
  },[user])
const handleFilter=()=>{
  if(!date){
    alert("please select the date")
    return;
  }
  fetch(`http://localhost:4000/todo?date=${date}&offset=${offset}&limit=10`)
  .then((response)=>response.json())
  .then((data)=>{
    setFilterUser(data)
  })
  .catch((err)=>{
    console.log(err);
    
  })
};
console.log(filterUser);

const deleteTodo =(id)=>{
  axios.delete(`http://localhost:4000/todo/${id}`)
  .then(()=>{
    fetch(`http://localhost:4000/todo`)
    .then((response)=>response.json())
    .then((data)=>{
      setUser(data);
    })
    .catch((err)=>{
      console.log(err);
      
    })
  })
  .catch((err)=>{
    console.log(err);
  })
}
const handleSearch=()=>{
  fetch(`http://localhost:4000/search?search=${search}&limit=10&offset=${offset}`)
  .then((response)=>response.json())
  .then((data)=>{
    setFilterUser(data)
  })
  .catch((err)=>{
    console.log(err);
    
  })
}
const handleSelecttask=(id)=>{
  axios.put(`http://localhost:4000/status/${id}`)
  .then((response)=>{
    console.log("updated status:",response.data);
  })
  .catch((err)=>{
    console.log(err);
    
  })
}
  return (
    <div className=' bg-gray-700 ' >
      <div className='flex ml-8 '>
           <input className='border-2  shadow-2xl rounded-[7px] mt-[30px] w-[120px] h-[22px] font-Noto sans ' type='date' value={date} onChange={(e)=>setDate(e.target.value)}  ></input><br></br>
           <button className='bg-btn  rounded-[10px] w-[75px] mt-[30px] ml-4 pb-4 h-[25px] font-semibold font-inder' onClick={handleFilter}>Apply</button>
           </div> 
           <div className='flex ml-[280px] '>
           <input className='border-2  shadow-2xl rounded-[7px] relative bottom-6 w-[120px] h-[22px] font-Noto sans ' type='text' value={search} placeholder='search todo' onChange={(e)=>setSearch(e.target.value)}  ></input><br></br>
           <button className='bg-btn  rounded-[10px] w-[75px] relative bottom-6 ml-4 pb-4 h-[25px] font-semibold font-inder' onClick={handleSearch}>Apply</button>
           </div> 
           <div>
        <select className=' shadow-2xl text-slate-600  rounded-[3px] ml-[1020px] relative bottom-11 ' value={status} onChange={(e)=>setStatus(e.target.value)} >
        <option value="" >Select Task</option>
            <option value="open" >open</option>
            <option value="completed" >complete</option>
        </select>
           </div>
          <div className='ml-[1180px] relative bottom-[70px] right-8 flex ' >
            <button className='bg-btn  rounded-[3px] font-semibold font-Oswald mr-[10px] h-6 w-[90px] '  ><Link to='/CreateTodo'>CreateTodo</Link></button>
            <button className='bg-red-600 text-white rounded-[3px] font-semibold font-Oswald h-6 w-[70px]'  ><Link to='/Signup'>SignOut</Link></button>
            </div>
            <div className=' ml-[500px]  shadow-orange-600'>
              {
                filterUser.map((cart)=>(
                  <ol  className='pl-[50px] h-[125px] w-[400px] shadow-2xl   mt-4 relative bottom-11'>
                    {/* <li  className=' font-extrabold  text-red-400  relative right-8 top-2  '>{cart.id}</li>  */}
                  <li  className='text-orange-700  '>{cart.title}</li> 
                  <li className='text-slate-300'>{cart.description}</li>
                  <li className='text-emerald-600'>{cart.current}</li>
                  <li className='text-emerald-600'>{cart.reminder}</li>
                  <li className='text-slate-300 relative bottom-11 left-[220px]'>Status:{cart.status}</li>
                  <label >
                  <h5  onClick={()=>handleSelecttask(cart.id)}  className='text-blue-500 relative bottom-6'>Mark As Complete <input type='checkbox' required  />   </h5>
                  </label> 
                  <div>
                  <Link to={`/Copytodo/${cart.id}`} key={cart.id}><button  className='bg-blue-400   h-6 w-11 ml-[160px] relative rounded-[3px] bottom-[47px] font-semibold font-inder'>Copy</button></Link>
                  </div>
                  <div>
                  <Link to={`/Edittodo/${cart.id}`} key={cart.id}><button  className='bg-btn  h-6 w-11 ml-[215px] relative rounded-[3px] bottom-[70px] font-semibold font-inder'>Edit</button></Link>
                  </div>
                   <button  onClick={()=>deleteTodo(cart.id)} className='bg-red-700 text-white h-6 w-[70px]  ml-[270px] relative rounded-[3px] bottom-[94px] font-semibold font-inder'>Delete</button>
                   <br></br>
                  </ol>
                ))
              }
              <div className='mt-5'>
              <button className=' bg-orange-500 rounded-[3px] text-white ml-[150px] relative bottom-4' onClick={()=>{
                setOffset((offset)=>offset+10)
              }} >Load More</button>
              </div>
            </div>
          
    </div>
  )
}
export default Navbar