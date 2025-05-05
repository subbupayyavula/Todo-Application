import React,{useState} from 'react'
import logo from './icon/todologo.jpg';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  //here we using navigation for coonection to another pagessssssssssssss
  const navigate= useNavigate();
  //user email and password for login
  const[user,setUser]=useState({
    email:"",
    password:""
});
//here destruture the email,password for directly using without user varaiblename
const{email,password}=user;
// handle the chagnes of user enter details
const handleuser=(e)=>{
  setUser({...user,[e.target.name]:e.target.value});
}
//post the data to database using api with signin button
  const Signin=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/login',user)
    .then(()=>{
      if(user.password===password && password!=="" ){
      navigate("/Navbar")
      }
    })
    .catch(err=>{
      console.log(err)
      
    })
  }
  return (
    <div className='flex h-screen  bg-primary '>
     <div>
        <img className='h-[572px] w-[550px] mt-[35px] ml-[100px] rounded-[40px] ' src={logo}></img>
       </div>
       <div className='bg-white h-[572px] w-[550px] rounded-[40px] mt-[35px] ml-[48px] shadow-slate-400'>
        <h1 className=' font-Oswald h-[71px] width-[212px] mt-[120px] ml-[97px] text-4xl  font-bold'>Sign in</h1>
        <input className='border-2 border-black mt-[6px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='email' name='email' value={email} onChange={handleuser} placeholder='Enter Email'></input> <br></br>
        <input className='border-2  border-black  mt-[27px] ml-[90px] rounded-[7px] w-[301px] h-[32px] font-Noto sans align-center' type='password' name='password' value={password} onChange={handleuser} placeholder='Enter Password'></input><br></br>
       <button className='bg-btn mt-6 ml-[90px] rounded-[10px] w-[301px] h-[40px] font-semibold font-inder'onClick={Signin} >Sign In</button> <br></br>
       <p className='mt-6 ml-[90px]  w-[340px] h-[40px]' >_____________________  or  ______________________ </p> <br></br>
       <p className='ml-[125px] '>Don't have an account?  <Link to="/Signup">Sign Up</Link> </p>
       </div>
    </div>
  )
}
export default Signin