import { useState } from "react"
import { HiOutlineTrash } from "react-icons/hi";
import { HiCheck } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";

const TableDataPopUp = ({user , setIsOpen , handleUpdateTable , handleDeleteRow})=>{

    const [form, setForm] = useState({
        name:user.name,
        age:user.age,
        isValueChange:false
    })
    

    return (
        <>
         <div className=" flex  ">
            <div className=" bg-gray-900 text-white h-[300px] w-[450px] rounded-xl shadow-gray-900 shadow-xl">
                <div className="space-y-2 flex flex-col items-center rounded-md pt-5">
                    <h3 className="text-center text-xl text-white">Update your details</h3>

                    <div className="flex flex-col items-start">
                    <label htmlFor="name" className="ml-1">Name</label>
                    <input  id="name" type="text" value={form.name} onChange={(e) => {setForm({...form, name: e.target.value, isValueChange:true})}}
                    className="cursor-pointer w-80 rounded-xl px-2 py-1 bg-gray-400 focus:bg-gray-600 placeholder:text-white" />
                    </div>

                    <div className="flex flex-col items-start">

                    <label htmlFor="age" className="ml-1">Age</label>
                    <input id="age" type="number" value={form.age} onChange={(e) => {setForm({...form, age: e.target.value , isValueChange: true})}} 
                    className="cursor-pointer w-80 rounded-xl px-2 py-1 bg-gray-400 focus:bg-gray-600 placeholder:text-white"/>
                    </div>

                </div>
                <div className="mt-10 flex justify-between mx-14">
                    <div>
                        {form.isValueChange ?(
                            <button onClick={()=>setIsOpen(false)} 
                            className="group flex gap-2 items-center px-3 py-1 cursor-pointer bg-gradient-to-b from-gray-300 to-gray-500 rounded-2xl hover:from-gray-400 hover:to-gray-700 transition-all duration-300 hover:scale-105">
                            cancel<span className="text-xl group-hover:rotate-20 transition-all duration-300"><HiOutlineX/></span> 
                        </button>
                        ) 
                        : 
                        (
                            <button onClick={()=>setIsOpen(false)}
                             className="group flex items-center gap-2 cursor-pointer px-3 py-1 bg-gradient-to-b from-gray-300 to-gray-500 rounded-2xl hover:from-gray-400 hover:to-gray-700 transition-all duration-300 hover:scale-105">
                            close <span className="text-xl group-hover:rotate-20 transition-all duration-300"><HiOutlineX/></span> 
                        </button>
                        )}
                        
                    </div>
                    <div>
                        {form.isValueChange ? (
                             <button  onClick={()=>handleUpdateTable(user.id, form)}
                             className="group flex gap-2 items-center px-3 py-1 bg-gradient-to-b from-red-300 to-red-500 rounded-2xl hover:bg-red-500 hover:from-red-400 hover:to-red-700 transition-all duration-300 hover:scale-105">
                            update <span className="text-lg group-hover:scale-110 transition-all duration-300"><HiCheck/> </span>
                        </button>
                        ) : (
                             <button onClick={()=>handleDeleteRow(user.id)}
                              className="group px-3 py-1 flex mr-2 items-center gap-2 bg-gradient-to-b from-red-300 to-red-500 rounded-2xl hover:bg-red-500 hover:from-red-400 hover:to-red-700 transition-all duration-300 hover:scale-105">
                            delete <span className="text-xl group-hover:scale-110 transition-all duration-300"><HiOutlineTrash/></span>
                        </button>
                        )}
                       
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}
export default TableDataPopUp