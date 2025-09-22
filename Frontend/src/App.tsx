import './App.css'
import Table from './Component/Table/Table.js'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Parent from './Component/Hooks/Parent';
import { createBrowserRouter, RouterProvider } from 'react-router';
import UserDetailPage from './Pages/UserDetailsPage';

const router = createBrowserRouter([
  {
    path: "/", element: <Table/>,
   
  },
  {
    path:"user/:id",
    element:<UserDetailPage/>
  }
])
function App() {

  return (

    <>
    <ToastContainer/>
    <RouterProvider router={router}/>
    {/* <div className='bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 min-h-screen w-full relative'>

    {/* <Parent/> */}
      {/* <Table/>
    </div> */}
    </>
  )
}

export default App
