import { useState } from 'react'
import './App.css'
import Table from './Component/Table/Table'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {

  return (

    <>
    <ToastContainer/>
    <div className='bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 h-screen w-screen'>

      <Table/>
    </div>
    </>
  )
}

export default App
