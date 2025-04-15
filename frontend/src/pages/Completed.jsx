import React ,{useState,useEffect}from 'react'
import Cards from '../components/Home/Cards'
import axios from "axios";

const Completed = () => {
  const [Data, setData] = useState();
     const headers= {id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
      };
      useEffect(() => {
        const fetch=async()=>{
        const response  =  await axios.get("http://localhost:3001/api/v2/get-comp-task",{headers})
       setData(response.data.data);
        }
      fetch();
       
      }, [])
  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4">Completed Task</h2>
     <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default Completed
