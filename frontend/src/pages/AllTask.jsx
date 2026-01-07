// src/pages/AllTask.jsx
import React, { useState,useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { IoAddCircleSharp } from 'react-icons/io5';
import Inputdata from '../components/Home/Inputdata';
import axios from 'axios';

const AllTask = () => {
  const [Inputs,setInputs]=useState("hidden");
   const [Data, setData] = useState();
   const [updatedData, setupdatedData] = useState({id:"",title:"",desc:""});

   const headers= {id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch=async()=>{
    const response  =  await axios.get( `${process.env.REACT_APP_API_URL}/api/v2/get-all-task`,{headers})
   setData(response.data.data);
    }
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }  
  })
  console.log(Data);
  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={()=>setInputs("fixed")}>
            <IoAddCircleSharp className='text-4xl text-yellow-600 hover:text-yellow-200 transition-all duration-300'/>
          </button>
        </div>
       {Data &&<Cards home={"true"} setInputs={setInputs} data={Data.tasks} setupdatedData={setupdatedData}/>}
      </div>
     <Inputdata Inputs={Inputs} setInputs={setInputs} updatedData={updatedData} setupdatedData={setupdatedData}/>
    </>
  );
}

export default AllTask;
