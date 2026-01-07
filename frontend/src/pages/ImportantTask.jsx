import React, {useState,useEffect} from 'react'
import Cards from '../components/Home/Cards'
import axios from "axios";

const ImportantTask = () => {
  const [Data, setData] = useState();
   const headers= {id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`,
    };
    useEffect(() => {
      const fetch=async()=>{
      const response = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/v2/get-imp-task`,
  { headers }
);
setData(response.data.data);

      }
    fetch();
     
    }, [])
  return (
    <div>
       <h2 className="text-3xl font-bold text-white mb-4">Important Task</h2>
      <Cards homw={false} data={Data}/>
    </div>
  )
}

export default ImportantTask
