import React, { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from "axios";

const Inputdata = ({ Inputs, setInputs,updatedData,setupdatedData }) => {
  
useEffect(()=>{
  setData({title: updatedData.title, desc: updatedData.desc});
},[updatedData])

const headers = {
  "Content-Type": "application/json",
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
};

  const [Data, setData] = useState({title:"",desc:""})
  const change=(e)=>{
    const{name,value}=e.target;
    setData({...Data, [name]: value }); 

  }
   const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      toast.error("All fields are required!", { position: "top-right", autoClose: 2000 });
    } else {
      try {
        await axios.post("http://localhost:3001/api/v2/create-task", Data, { headers, });
        

        toast.success("Task created successfully!", { position: "top-right", autoClose: 2000 });
        setData({title:"", desc:""});
        setInputs("hidden");
       
      } catch (err) {
        console.error("Error creating task:", err);
        toast.error("Failed to create task");
      }
    }
  };
   
  const updateTask=async()=>{
    if (Data.title === "" || Data.desc === "") {
      toast.error("All fields are required!", { position: "top-right", autoClose: 2000 });
    } else {
      try {
        await axios.put(`http://localhost:3001/api/v2/update-task/${updatedData.id}`, Data, { headers, });
        toast.success("Task created successfully!", { position: "top-right", autoClose: 2000 });
        setData({title:"", desc:""});
        setupdatedData({id:"", title:"",desc:""});
        setInputs("hidden");
       
      } catch (err) {
        console.error("Error creating task:", err);
        toast.error("Failed to create task");
      }
    }
  }
  return (
    <>
      <div className={`${Inputs} top-0 left-0 bg-gray-900 opacity-90 h-screen w-full`}></div>
      <div className={`${Inputs} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-2/6 bg-yellow-600 p-4 rounded'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold text-black text-center w-full'>Add Task</h2>
            <button
              className='text-2xl text-black p-2'
              onClick={()=>{
                setInputs("hidden");
                setData({title:"",desc:""})
                setupdatedData({id:"", title:"",desc:""});
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input 
            type='text' 
            placeholder='Title' 
            name="title" 
            className='px-3 p-3 rounded w-full bg-black' 
            value={Data.title}
            onChange={change}
          />
          <textarea 
            name='desc' 
            cols="30" 
            rows="10" 
            placeholder='Description....' 
            className='px-3 py-2 rounded w-full bg-black my-3'
            value={Data.desc}
            onChange={change}
           
          ></textarea>
            <div className="flex justify-center">
           {updatedData.id==="" ? (<button className="px-3 py-2 bg-green-800 rounded text-white text-xl" onClick={submitData}>Submit</button>):
           (<button className="px-3 py-2 bg-green-800 rounded text-white text-xl" onClick={updateTask}>Update</button>) }

          </div>
        </div>
      </div>
    </>
  );
}

export default Inputdata;
