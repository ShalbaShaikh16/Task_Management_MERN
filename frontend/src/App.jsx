import React, { useEffect } from 'react'
import Home from './pages/Home'
import {Routes, Route, useNavigate}from "react-router-dom";
import AllTask from './pages/AllTask';
import { ToastContainer } from "react-toastify";
import ImportantTask from './pages/ImportantTask';
import Completed from './pages/Completed';
import Incomplelte from './pages/Incomplete';
import ErrorBoundary from './components/ErrorBoundry';  // Import the ErrorBoundary
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useSelector,useDispatch} from "react-redux";
import { authActions } from './store/auth';


const App = () => {
  const navigate=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
   else if(isLoggedIn===false){
      navigate("/signup");
    }
  },[]);
  return (
    <div className="bg-gray-900 text-white p-2 relative min-h-screen overflow-auto">
       <div>
      <ToastContainer position="top-right" autoClose={2000} />
     
    </div>
      <ErrorBoundary>
      
        <Routes>
          <Route exact path='/' element={<Home/> }>
          <Route index element={<AllTask/> }/>
          <Route path="/importantTask" element={<ImportantTask/>}/>
          <Route path="/completedTask" element={<Completed/>}/>
          <Route path="/incompleteTask" element={<Incomplelte/>}/>
          </Route>

          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
     </ErrorBoundary>
    </div>
   
  )
}

export default App
