import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { authActions } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [Data, setData] = useState({ username: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Data.username === "" || Data.password === "") {
      toast.error("All Fields are required!");
      return;
    }
    try {
      const response = await axios.post(
         `${process.env.REACT_APP_API_URL}/api/v1/log-in`,
        Data,
        { headers: { "Content-Type": "application/json" } }
      );
      setData({ username: "", password: "" });
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message, { autoClose: 2000 });
      dispatch(authActions.login());
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-700">
      <div className="flex w-4/5 h-4/5 bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Side: Branding and Welcome Message */}
        <div className="w-1/2 bg-black text-white flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold italic tracking-widest mb-4">TASKIFY</h1>
          <p className="text-xl font-bold text-gray-300">Welcome Back!</p>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-yellow-600 text-white">
          <div className='text-[35px] font-semibold text-center mb-6'>Login</div>
          <input type='text' placeholder='Username' name='username' value={Data.username} onChange={change} className='bg-black px-3 py-2 my-2 w-full rounded' />
          <input type='password' placeholder='Enter Password' name='password' value={Data.password} onChange={change} className='bg-black px-3 py-2 my-2 w-full rounded' required />
          
          <div className="flex flex-col items-center mt-4 space-y-3">
            <button className="bg-white text-xl font-semibold w-full text-black px-3 py-2 rounded" onClick={submit}>
              Login
            </button>
            <Link to="/signup" className="text-gray-200 text-lg">
              Not a Member? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
