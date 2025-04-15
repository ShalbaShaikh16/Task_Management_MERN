import React,{useState,useEffect} from 'react'
import axios from "axios";
import Cards from '../components/Home/Cards';
const Incomplete = () => {
   const [Data, setData] = useState();
       const headers= {id:localStorage.getItem("id"),
          authorization:`Bearer ${localStorage.getItem("token")}`,
        };
        useEffect(() => {
          const fetch=async()=>{
          const response  =  await axios.get("http://localhost:3001/api/v2/get-incomp-task",{headers})
         setData(response.data.data);
          }
        fetch();
         
        }, []) 
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">Incomplete Task</h2>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default Incomplete
