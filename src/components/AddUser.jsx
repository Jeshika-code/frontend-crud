import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const AddUser = () => {
    
  const users = {
    fname:"",
    lname:"",
    email:"",
    password:""
  }
    const [user, setUser] = useState(users);
    const navigate = useNavigate();
  
    const inputHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }
    const submitForm = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:4000/api/create", user)
        .then((response)=>{
           toast.success(response.data.message, {position:"top-right", color:"blue"})
           navigate("/")
        })
        .catch(error => console.log(error))
      }
  return (
    <>
      <div className="p-4">
        <Link to={'/'} className="bg-orange-400 text-white px-4 py-1 rounded-md mb-4 inline-block">Back</Link>
        <h3 className="text-xl font-semibold mb-4">Add new user</h3>
        <form className="addUserForm"onSubmit={submitForm} >
          <div className="mb-4">
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First name</label>
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" id="lname" name="lname" className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off" placeholder="Last name" onChange={inputHandler}  />
          </div>
            <input type="text" id="fname" name="fname" className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off" placeholder="First name"  onChange={inputHandler}  />
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off" placeholder="Email"  onChange={inputHandler}  />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password"  onChange={inputHandler} className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off" placeholder="Password" />
          </div>
          <div className="mb-4">
            <button  type="submit" className="bg-orange-400 text-small text-white px-2 py-1 rounded-md">Add User</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUser
