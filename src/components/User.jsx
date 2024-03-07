import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
  
      const fetchData = async()=>{
          const response = await axios.get("http://localhost:4000/api/getall");
          setUsers(response.data);
      }
  
      fetchData();
  
    },[])
    const deleteUser = async(userId) =>{
        await axios.delete(`http://localhost:4000/api/delete/${userId}`)
        .then((respones)=>{
          setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
          toast.success(respones.data.message, {position: 'top-right'})
        })
        .catch((error) =>{
          console.log(error);
        })
    }
    return (
        <>
            <div className='p-4'>
                <Link to='/add' className='bg-orange-400 text-white px-4 py-2 rounded-md mb-4 inline-block'>Add User</Link>
                <table className='border-collapse border border-blue-500'>
                    <thead className='bg-black text-white'>
                        <tr>
                            <th className='border border-white px-4 py-2'>S.no</th>
                            <th className='border border-white px-4 py-2'>User Name</th>
                            <th className='border border-white px-4 py-2'>User Email</th>
                            <th className='border border-white px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user,index)=>
                            {
                                return(
                                    <tr key={user._id}>
                                    <td className='border border-black px-4 py-2'>{index + 1}</td>
                                    <td className='border border-black px-4 py-2'>{user.fname} {user.lname}</td>
                                    <td className='border border-black px-4 py-2'>{user.email}</td>
                                    <td className='border border-black px-4 py-2'>
                                        <button onClick={()=>deleteUser(user._id)}className='bg-red-400 text-white px-2 py-1 rounded-md mr-2'>Delete</button>
                                        <Link to={`/edit/`+user._id} className='bg-green-400 text-white px-4 py-1 rounded-md'>Edit</Link>
                                    </td>
                                </tr>
                                )
                            })
                        }
                       
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default User;
