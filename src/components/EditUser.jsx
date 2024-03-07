import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const users = {
        fname: "",
        lname: "",
        email: ""
     }
    
     const {id} = useParams();
     const navigate = useNavigate();
     const [user, setUser] = useState(users);
    
     const inputChangeHandler = (e) =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});

     }
    
     useEffect(()=>{
        axios.get(`http://localhost:8000/api/getone/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
     },[id])
    
    
     const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:4000/api/update/${id}`, user)
        .then((response)=>{
           toast.success(response.data.message, {position:"top-right"})
           navigate("/")
        })
        .catch(error => console.log(error))
     }
    
    return (
        <>
          <div className="p-4">
            <Link to={'/'} className="bg-orange-400 text-white px-4 py-1 rounded-md mb-4 inline-block">Back</Link>
            <h3 className="text-xl font-semibold mb-4">Update  user</h3>
            <form  onSubmit={submitForm} >
              <div className="mb-4">
                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First name</label>
                <input type="text" value={user.fname} id="fname" name="fname" className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off"  onChange={inputChangeHandler} placeholder="First name" />
              </div>
              <div className="mb-4">
                <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last name</label>
                <input type="text" id="lname" name="lname" value={user.lname}className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off" placeholder="Last name" onChange={inputChangeHandler}  />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" value={user.email} id="email" name="email" className="mt-1 p-2 border border-gray-300 rounded-md w-80" autoComplete="off" placeholder="Email" onChange={inputChangeHandler} />
              </div>
            
              <div className="mb-4">
                <button type="submit" className="bg-orange-400 text-small text-white px-2 py-1 rounded-md">Update User</button>
              </div>
            </form>
          </div>
        </>
      );
}

export default EditUser