import "./tablerow.css"
import { TUser } from "../../../Types/TableTypes"
import { TTableRowProps } from "../../../Types/TableTypes"
import React from "react"
import { useNavigate } from "react-router"

const TableRow : React.FC<TTableRowProps>= React.memo(({user, handleTablePopup, index})=>{
// console.log("table row");
const navigate = useNavigate()
    return(
        <>
        <tr  className="tablerow flex gap-7 justify-between lg:justify-between text-center border w-[300px] md:w-[400px] lg:w-[506px] cursor-pointer 
        shadow-xl shadow-gray-700 h-full "
        onClick={()=>{handleTablePopup?.(user.id );
           navigate(`/user/${user?.id}`) }
        }>
            <td className="w-10 text-md md:w-20 md:text-lg ml-2 md:ml-0" >{index + 1}</td>
            <td className="w-18 text-md md:w-20 md:text-lg overflow-auto h-full text-left">{user.name}
                
            </td>
            <td className=" text-md md:w-24 md:text-lg">{user.age ?? "-"}</td>
            <td className={`w-15 ml-5 text-md md:w-20 md:text-lg ${user.age === null ? "bg-gray-100 text-black" :user.age < 18 ? "bg-yellow-300 text-black transition-all duration-300 hover:bg-yellow-400" :
                 user.age <= 60 ? "bg-green-300 text-black transition-all duration-300 hover:bg-green-400" : 
                 "bg-red-300 text-black transition-all duration-300 hover:bg-red-400" }`}>
                {user.age === null ? "Unknown": user.age < 18 ? "Teen" : user.age <= 60 ? "Adult" : "Old" } </td>
        </tr>
        </>
    )
} )
export default TableRow;