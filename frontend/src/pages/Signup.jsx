import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const history = useNavigate();
    if (isLoggedIn === true) {
        history("/");
    }

    const [Data, setData] = useState({ username: "", email: "", password: "" });

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async () => {
        if (Data.username === "" || Data.email === "" || Data.password === "") {
            toast.error("All fields are required!");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:3001/api/v1/sign-in",
                Data,
                { headers: { "Content-Type": "application/json" } }
            );
            setData({ username: "", email: "", password: "" });
            console.log("Response:", response.data);
            toast.success(response.data.message, { autoClose: 2000 });
            history("/login");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Signup failed!");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-700">
            <div className="flex w-4/5 h-4/5 bg-white rounded-2xl shadow-2xl overflow-hidden">

                {/* Left Side*/}
                <div className="w-1/2 bg-black text-white flex flex-col items-center justify-center">
                <h3>Welcome to</h3>
                    <h1 className="text-6xl font-bold italic tracking-widest mb-4">TASKIFY</h1>
                    <p className="text-xl font-bold text-gray-300">Please Login or Signup to view your tasks.</p>
                </div>

                {/* Signup Form */}
                <div className="w-1/2 p-10 flex flex-col justify-center bg-yellow-600 text-white">
                    <div className='text-[35px] font-semibold text-center mb-6'>Sign Up</div>
                    <input type='text' placeholder='Username' name='username' value={Data.username} className='bg-black px-3 py-2 my-2 w-full rounded' onChange={change} />
                    <input type='email' placeholder='Enter Email' name='email' value={Data.email} className='bg-black px-3 py-2 my-2 w-full rounded' onChange={change} required />
                    <input type='password' placeholder='Enter Password' name='password' value={Data.password} className='bg-black px-3 py-2 my-2 w-full rounded' onChange={change} required />
                    <div className="flex flex-col items-center mt-4 space-y-3">
                        <button className="bg-white text-xl font-semibold w-full text-black px-3 py-2 rounded" onClick={submit}>
                            Sign Up
                        </button>
                        <Link to="/login" className="text-gray-200 text-lg">
                            Already a User? Login
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Signup;
