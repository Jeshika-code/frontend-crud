import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom'

const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:8000/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <div className=' bg-sky-200 mx-auto mt-20 w-4/5 '>
        <Link to={"/add"} className='p-1 m-4 mx-2 my-4 bg-cyan-100 shadow-lg shadow-cyan-500/50'>Add User</Link>
        <table className='w-full  mt-3 border-collapse	'border={1} cellPadding={10} cellSpacing={0}>
            <thead className='w-10 '>
                <tr>
                    <th className='p-2 bg-sky-100 text-black'>S.No.</th>
                    <th className='p-2 bg-sky-100 text-black'>User name</th>
                    <th className='p-2 bg-sky-100 text-black'>User Email</th>
                    <th className='p-2 bg-sky-100 text-black'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'>{user.fname} {user.lname}</td>
                            <td className='text-center'>{user.email}</td>
                            <td className='outline-none bg-red cursor-pointer'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                } */}
                      
                        <tr >
                              <td className='text-center'>1</td>
                            <td className='text-center'>Saniya KuMAR</td>
                          
                            <td className='text-center'>JESHIKA@GMAIL.COM</td>
                            <td className='outline-none bg-red cursor-pointer'>
                                <button><i className="fa-solid fa-trash"></i></button>
                                <Link><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                   
                
            </tbody>
        </table>
    </div>
  )
}

export default User