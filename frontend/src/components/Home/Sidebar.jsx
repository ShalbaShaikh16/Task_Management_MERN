import React, { useState, useEffect } from 'react';
import { FaTasks } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaCheckDouble } from 'react-icons/fa';
import { IoAlertCircle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundry';
import { useDispatch } from "react-redux";
import { authActions } from '../../store/auth';
import axios from "axios";
import { FiCheckSquare } from "react-icons/fi";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = [
    {
      title: 'All Task',
      icons: <FaTasks />,
      link: '/',
    },
    {
      title: 'Important Task',
      icons: <FaHeart />,
      link: '/importantTask',
    },
    {
      title: 'Completed Task',
      icons: <FaCheckDouble />,
      link: '/completedTask',
    },
    {
      title: 'Incomplete Task',
      icons: <IoAlertCircle />,
      link: '/incompleteTask',
    },
  ];
  const [Data, setData] = useState();
  const logout = () => {

    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    navigate("/signup");
  }
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/v2/get-all-task`,
  { headers }
);

      setData(response.data.data);
    }
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  })



  return (
    <>
      {Data && (
        <div>
          <h4 className="text-yellow-600 text-center text-2xl font-bold italic flex items-center justify-center gap-2">
            <FiCheckSquare className="text-4xl text-white" />
            Taskify
          </h4>
          <h3 className="text-center text-2xl font-semibold text-white mb-2">
        👋 Welcome, {Data.username || "User"}!
      </h3>
          <h5 className='text-yellow-600 text-center text-sm'>{Data.email || "No Email Available"}</h5>
          <hr className='my-2' />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className='text-[20px] my-2 flex items-center hover:bg-yellow-600 p-2 rounded transition-all duration-300'
          >
            {items.icons} &nbsp;{items.title}
          </Link>
        ))}
      </div>

      <div>
        <button className='bg-yellow-600 w-full p-2 rounded' onClick={logout}>
          Logout
        </button>
      </div>

    </>
  );
}
const SidebarWithErrorBoundary = () => (
  <ErrorBoundary>
    <Sidebar />
  </ErrorBoundary>
);

export default SidebarWithErrorBoundary;
