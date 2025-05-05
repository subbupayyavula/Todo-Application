import React,{useState} from 'react'
import logo from './icon/todologo.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
function Signup() {
  const[data,setData]=useState({
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      conformpass:"",
  });
  const [error,setError]=useState("");
  const{firstname,lastname,email,password,conformpass}=data;
  const handle=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(data);
    if(password===conformpass){
     axios.post('http://localhost:4000/user',data)
     setError("successfully register with user details")
    }
    else{
      console.log("not posted");
      setError("password & conformpassword not matched")
    }
  }
  return (
    <div className='flex bg-primary h-screen w-[1350px]'>
    <div>
       <img className='h-[572px] w-[550px] mt-[35px] ml-[100px] rounded-[40px] ' src={logo}></img>
      </div>
      <div  className='bg-white h-[572px] w-[550px] rounded-[40px] mt-[35px] ml-[48px] shadow-slate-400'>
       <h1 className=' font-Oswald h-[71px] width-[212px] mt-[100px] ml-[97px] text-4xl  font-bold'>Sign Up</h1>
       <form onSubmit={handleSubmit}>
       <input className='border-2 border-black mt-[4px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='text' name='firstname' value={firstname} onChange={handle} placeholder='First Name'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='text' name='lastname' value={lastname} onChange={handle} placeholder='Last Name'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='email' name='email' value={email} onChange={handle} placeholder='E-mail address'></input> <br></br>
       <input className='border-2 border-black mt-[15px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='password' name='password' value={password} onChange={handle} placeholder='Enter Password'></input><br></br>
       <input className='border-2 border-black mt-[15px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='password' name='conformpass' value={conformpass} onChange={handle} placeholder='Re-enter the password'></input> <br></br>
       <p className='text-red-700 ml-[90px]'>{error}</p>
      <button className='bg-btn mt-6 ml-[90px] rounded-[10px] w-[301px] h-[40px] font-semibold font-inder' type='submit'>Sign Up</button> <br></br>
      <p className='ml-[120px] mt-6'>Already have an account?   <Link to="/">Sign In</Link></p>
      </form>
      </div>
   </div>
  )
}
export default Signup