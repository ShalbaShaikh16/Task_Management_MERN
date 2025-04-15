import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../components/ErrorBoundry'
const Home = () => {
  return (
    
    <ErrorBoundary>
    <div className='flex h-[98vh] gap-4'>
      <div className=" w-1/6 border border-yellow-500 rounded-xl p-4 flex flex-col justify-between">
      <Sidebar/>
      </div>
      <div className=" w-5/6 border border-yellow-500 rounded-xl p-4">
      <Outlet/>
      </div>
    </div>
    </ErrorBoundary>
  )
}

export default Home
