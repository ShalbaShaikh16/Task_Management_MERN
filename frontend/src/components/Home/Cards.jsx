import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Cards = ({home,setInputs,data,setupdatedData}) => {
  const headers= {id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async(id)=>{
    try{
    await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v2/update-Comp-task/${id}`,{},{headers}
      );
    
      toast.success("Task updated successfully!", {
        position: "top-right",
        autoClose: 2000, 
      });
  } catch (err) {
    console.error("Error updating task:", err);
  }
};
const handleImp = async(id)=>{
  try{

    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v2/update-Imp-task/${id}`,{},{headers}
    );
    
    toast.success("Task updated successfully!", {
      position: "top-right",
      autoClose: 2000, 
    });
} catch (err) {
  console.error("Error updating task:", err);
}
};

const deleteTask = async(id)=>{
  try{

    await axios.delete(`${process.env.REACT_APP_API_URL}/api/v2/delete-task/${id}`, { headers });
    
    toast.success("Task Deleted successfully!", {
      position: "top-right",
      autoClose: 2000, 
    });
} catch (err) {
  console.error("Error updating task:", err);
}
};
const handleUpdate =(id,title,desc)=>{
  setInputs("fixed");
  setupdatedData({id:id, title:title, desc:desc});
}
    return (
      <div className='grid grid-cols-3 gap-4 p-4 '>
        {data && data.map((items, i) => (
          <div 
            key={items.id || i}  
            className='flex flex-col justify-between border border-yellow-800 bg-yellow-600 rounded-xl p-6'
          >
            <div>
              <h3 className='text-black text-[30px] font-semibold'>{items.title}</h3>
              <p className='text-[20px] text-black my-2'>{items.desc}</p>
            </div>
            <div className='mt-4 w-full flex items-center'>
              <button className={`${items.complete === false ? "bg-red-800" : "bg-green-800"} p-2 rounded w-3/6`} 
              onClick={()=>handleCompleteTask(items._id)}>
                {items.complete===true ? "Completed" :"InComplete"  }
              </button>
    
              <div className='text-black p-2 w-3/6 text-[25px] flex justify-around'>
                <button onClick={()=>handleImp(items._id)}>{items.important===false ? (<FaRegHeart />): (<FaHeart className='text-red-500'/>)}</button>
               {home!=="false" && <button onClick={()=>handleUpdate(items._id,items.title,items.desc)}><FaEdit /></button>}
                <button onClick={()=>deleteTask(items._id)}><MdDelete /></button>
              </div>
          </div>
        </div>
      ))}
      {home==="true"&&(
      <button className='flex flex-col justify-center items-center border border-yellow-800 bg-yellow-600 rounded-xl p-6 hover:scale-105 hover:cursor-pointer transition-all duration-300' 
      onClick={() => setInputs("fixed")}>
        <FaPlus />
        <h2 className='text-2xl mt-4 text-black'>Add Task</h2>
      </button>
      )}
    </div>
  );
}

export default Cards
